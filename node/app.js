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
    const result = {};
    Object.keys(availability).map((availDate) => {
        Object.keys(availability[availDate]).map((timeslot) => {
            const advisorID = availability[availDate][timeslot];
            if (!result.hasOwnProperty(advisorID)) {
                result[advisorID] = [];
            }
            result[advisorID].push(timeslot);
        });
    });
    return result;
}

app.today = today;
app.transformAvailability = transformAvailability;
module.exports = app;