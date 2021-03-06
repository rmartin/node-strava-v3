/**
 * Created by austin on 9/27/14.
 */

var strava = require('../');

var testsHelper = {};

testsHelper.getSampleAthlete = function(done) {
    strava.athlete.get({},function(err,payload) {

        done(err,payload);
    });
};

testsHelper.getSampleActivity = function(done) {
    strava.athlete.listActivities({include_all_efforts:true},function(err,payload) {
        strava.activities.get({id:payload[0].id,include_all_efforts:true},function(err,payload) {

            done(err,payload);
        });
    });
};

testsHelper.getSampleClub = function(done) {
    strava.athlete.listClubs({},function(err,payload) {

        done(err,payload[0]);
    });
};

testsHelper.getSampleGear = function(done) {
    this.getSampleAthlete(function(err,payload) {

        var gear = payload.bikes.length ? payload.bikes[0] : payload.shoes[0];
        done(err,gear);
    });
};

testsHelper.getSampleSegmentEffort = function(done) {

    this.getSampleActivity(function(err,payload) {

        done(err,payload.segment_efforts[0]);
    });
};

testsHelper.getSampleSegment = function(done) {

    this.getSampleSegmentEffort(function(err,payload) {

        done(err,payload.segment);
    });
};

module.exports = testsHelper;
