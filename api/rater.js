const _ = require('underscore');
const Bourne = require('bourne');

class Rater {
    constructor(type){
        this.type = type;
        this.db = new Bourne(`./db-${type}.json`);
    }

/*
Add function to add user and item
1. check if user exists (find user in db)
2. if user exist , do not do anything
3. if user does not exist , add user
4. then calculate similar users and suggestions
*/
    add(user, item){
        return new Promise((resolve, reject) => {
            this.db.find({user, item}, (err, res) => {
                if (err) {
                    reject('Error finding user / item in db: ',err);
                }
                if (res.length > 0) {
                    resolve('User & item already exists');
                }

                this.db.insert({user, item}, (err, res) => {
                    if (err) {
                        reject('Error inserting user in db: ',err);
                    }

                    // Update similar users here 
                    // Update suggestions here
                    
                    resolve('User & item added');
                })
            })
        })
    }
/*
Remove user items
*/
    remove(user, item){
        // return new Promise((resolve, reject) => {

        // })
    }
}



module.exports = {
    Rater,
}