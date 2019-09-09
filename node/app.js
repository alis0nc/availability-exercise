const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const axios = require("axios");
const _ = require("lodash");

const availabilityApiUrl = "https://www.thinkful.com/api/advisors/availability";
const bookings = [];

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/today", (_, res) => {
    res.send({
        today: today()
    });
});

app.get("/available", (_, res, next) => {
    axios.get(availabilityApiUrl)
        .then((response) => {
            const availForDownstream = transformAvailability(response.data);
            res.send(availForDownstream);
        }).catch(next);
});

app.post("/book", (req, res, next) => {
    const { name, advisorID, time } = req.body;
    // error out if we don't have a valid name, advisorID, and time
    if (!name || !advisorID || !time) {
        console.log('You must send a valid name, advisorID, and time');
        res.status(400).send({
            error: 'You must send a valid name, advisorID, and time'
        });
    }
    // error out if this time with this advisor is already booked with somebody else,
    if (bookings.filter((booking) =>
        booking.advisorID == advisorID
        && booking.time == time
        && booking.name != name
    ).length) {
        res.status(400).send({
            error: 'Someone else has already booked this time'
        });
    }
    // or just return the booking if it's already booked with the same person
    else if (bookings.filter((booking) =>
        booking.advisorID == advisorID
        && booking.time == time
        && booking.name == name
    ).length) {
        res.send({
            name, advisorID, time
        });
    } else {
        axios.get(availabilityApiUrl).then((response) => {
            // error out if the requested time is not available with the requested advisor
            const date = moment(time).format('YYYY-MM-DD');
            const advisorFromResponse = _.get(response.data, [date, time], null);
            if (!advisorFromResponse || advisorFromResponse != advisorID) {
                res.status(400).send({
                    error: 'The requested time slot is not available with the requested advisor'
                });
            } else {
                bookings.push({
                    name, advisorID, time
                });
                res.send({
                    name, advisorID, time
                });
            }
        });
    }
});

app.get("/bookings", (_, res) => {
    res.send({
        bookings
    });
})

function today() {
    return moment().format();
}

function transformAvailability(availability) {
    // Transforms the upstream API response into something with field names
    // and a structure that more closely resembles the frontend's presentation,
    // so we don't have to do much processing on the frontend.
    const advisorBuckets = {};
    const result = [];
    // Bucket timeslots by advisor ID
    Object.keys(availability).map((date) => {
        Object.keys(availability[date]).map((time) => {
            const advisorID = availability[date][time];
            if (!bookings.filter((booking) =>
                booking.time == time
                && booking.advisorID == advisorID
            ).length) {
                if (!advisorBuckets.hasOwnProperty(advisorID)) {
                    advisorBuckets[advisorID] = [];
                }
                advisorBuckets[advisorID].push(time);
            }
        });
    });
    Object.keys(advisorBuckets).sort().map((advisorID) => {
        const advisorAvailability = {
            advisorID: advisorID,
            availableTimes: advisorBuckets[advisorID].sort()
        };
        result.push(advisorAvailability);
    });
    return result;
}

app.today = today;
app.transformAvailability = transformAvailability;
module.exports = app;