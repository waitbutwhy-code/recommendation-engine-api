const _ = require('underscore');
const Bourne = require('bourne');

class Rater {
    constructor(type){
        this.type = type;
        this.db = new Bourne(`./db-${type}.json`);
    }

/*
Add function to add a user
1. check if user exists (find user in db)
2. if user exist , do not do anything
3. if user does not exist , add user
4. then calculate similar users and suggestions
*/
    add(user){
        return new Promise((resolve, reject) => {
            this.db.find({user}, (err, res) => {
                if (err) {
                    reject('Error finding user in db: ',err);
                }
                if (res.length > 0) {
                    resolve('User already exists');
                }

                this.db.insert({user}, (err, res) => {
                    if (err) {
                        reject('Error inserting user in db: ',err);
                    }

                    // Update similar users here 
                    // Update suggestions here
                    
                    resolve('User added');
                })
            })
        })
    }
}



module.exports = {
    Rater,
}