const _ = require('underscore');
const Bourne = require('bourne');

class Query{
    constructor(){
        // e.g. this.genders = ['male', 'female'];
        this.genders = [];
        // e.g. this.ages = [18,21];
        this.ages = [18,21];
        // e.g. this.locations = ["USA"];
        this.locations = [];
        // e.g. this.time = ["Summer"];
        this.schedule = [];
        this.db = './db-query.json';
    }

    addGender(gender){
        return this.genders.push(gender);
    }

    addAge(age){
        return this.ages.push(age);
    }

    addLocation(location){
        return this.location.push(location);
    }

    addSchedule(schedule){
        return this.schedule.push(schedule);
    }

    updateDb(){
        return new Promise((resolve, reject) => {
            this.db.insert({
                        genders: this.genders, 
                        ages: this.ages,
                        locations: this.locations,
                        schedule: this.schedule,
                    }, (err, res) => {
                        if (err) {
                            reject('Error adding query ', err);
                        }

                        resolve('Added Query ', this);
                    })
        })
        
    }
}

module.exports = {
    Query,
}