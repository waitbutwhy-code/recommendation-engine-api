const _ = require('underscore');
const Bourne = require('bourne');

class Rater {
    constructor(type){
        this.type = type;
        this.db = new Bourne(`./db-${type}.json`);
    }

/*
Add function to add userId and itemId
1. check if userId - itemId combo exists (find in db)
2. if exist , do not do anything
3. if does not exist , add userId
4. then calculate similar userIds and suggestions
*/
    add(userId, itemId){
        return new Promise((resolve, reject) => {
            this.db.find({userId, itemId}, (err, res) => {
                if (err) {
                    reject('Error finding userId / itemId in db: ',err);
                }
                if (res.length > 0) {
                    resolve('userId & itemId already exists');
                }

                this.db.insert({userId, itemId}, (err, res) => {
                    if (err) {
                        reject('Error inserting userId in db: ',err);
                    }

                    // Update similar userIds here 
                    // Update suggestions here
                    
                    resolve('userId & itemId added');
                })
            })
        })
    }
/*
Remove userId itemIds
*/
    remove(userId, itemId){
        // return new Promise((resolve, reject) => {

        // })
    }
}



module.exports = {
    Rater,
}