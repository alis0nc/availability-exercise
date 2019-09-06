const app = require("./app");
const moment = require("moment");

describe("today", () => {
    it("returns today's date in ISO 8601 format with timezone offset", () => {
        expect(app.today()).toBe(moment().format());
    });
});

describe("transformAvailability", () => {
    const input = {
        "2019-04-04": {                          // Data is grouped by day
            "2019-04-04T13:00:00-04:00": 372955, // Keys represent availability date/time
            "2019-04-04T11:30:00-04:00": 399956, // Values represent the ID of the available advisor
            "2019-04-04T11:00:00-04:00": 372955
        },
        "2019-04-05": {
            "2019-04-05T11:30:00-04:00": 417239,
            "2019-04-05T16:00:00-04:00": 417239,
            "2019-04-05T18:00:00-04:00": 417239
        }
    };
    const expectedKeys = ["372955", "399956", "417239"];
    const expected417239 = [
        "2019-04-05T11:30:00-04:00",
        "2019-04-05T16:00:00-04:00",
        "2019-04-05T18:00:00-04:00"
    ];
    it("transforms the upstream availability response to have advisor IDs as keys", () => {
        expect(Object.keys(app.transformAvailability(input)).sort()).toEqual(expectedKeys);
    });
    it("...and the values for a certain advisor ID should be the open timeslots", () => {
        expect(app.transformAvailability(input)["417239"].sort()).toEqual(expected417239);
    });
});