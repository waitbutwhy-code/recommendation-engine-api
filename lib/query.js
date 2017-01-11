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
        this.db = new Bourne('./db-query.json');
    }

    addGender(gender){
        return new Promise((resolve, reject) => {
            if (this.genders.find( val => val === gender)) {
                resolve(`${gender} is already added`);
            }
            
            this.genders.push(gender);
            resolve(`Added ${gender}`);
        });  
    }

    addAge(age){
        return new Promise((resolve, reject) => {
            this.ages.push(age)
            resolve(`Added ${age}`);            
        })
    }

    addLocation(location){
        return new Promise((resolve, reject) => {
            if (this.locations.find( val => val === location)) {
                resolve(`${location} is already added`);
            }
            
            this.locations.push(location);
            resolve(`Added ${location}`);
        });  
    }

    addSchedule(schedule){
        return new Promise((resolve, reject) => {
            if (this.schedule.find( val => val === schedule)) {
                resolve(`${schedule} is already added`);
            }
            this.schedule.push(schedule) 
            resolve(`Added ${schedule}`);
        });
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