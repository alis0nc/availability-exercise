const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const axios = require("axios");

const availabilityApiUrl = "https://www.thinkful.com/api/advisors/availability";

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
    Object.keys(availability).map((availDate) => {
        Object.keys(availability[availDate]).map((timeslot) => {
            const advisorID = availability[availDate][timeslot];
            if (!advisorBuckets.hasOwnProperty(advisorID)) {
                advisorBuckets[advisorID] = [];
            }
            advisorBuckets[advisorID].push(timeslot);
        });
    });
    Object.keys(advisorBuckets).sort().map((advisorID) => {
        const advisorAvailability = {
            advisorID: advisorID,
            availableTimes: advisorBuckets[advisorID].sort()
        };
        console.log(advisorAvailability);
        result.push(advisorAvailability);
    });
    return result;
}

app.today = today;
app.transformAvailability = transformAvailability;
module.exports = app;