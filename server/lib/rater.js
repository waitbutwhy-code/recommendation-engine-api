const _ = require('underscore');
const Bourne = require('bourne');

class Rater {
    constructor(engine, type){
        this.engine = engine;
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

                    // Update similar  here 
                    // Update suggestions here
                    // this.engine.similars.update(userId);
                    // this.engine.suggestions.update(userId);
                    
                    resolve(`${userId} & ${itemId} added`);
                })
            })
        })
    }
/*
Remove userId itemIds
*/
    remove(userId, itemId){
        return new Promise((resolve, reject) => {
            this.db.delete({userId, itemId}, (err, res) => {
                if (err) {
                    resolve(`Error removing ${userId} - ${itemId}, ${err}`)
                }

                    // Update similar  here 
                    // Update suggestions here
                resolve(`Removed ${userId} - ${itemId} successfully`);
            })
        })
    }

    itemsByUser(userId){
        return new Promise((resolve, reject) => {
            this.db.find({userId}, (err, ratings) => {
                if(err){
                    reject(`Error getting items by ${userId}, ${err}`)
                }
                // console.log(`itemsByUser ratings for ${userId} is `, ratings);
                resolve(_.pluck(ratings, 'itemId'));
            })
        })
    }

    usersByItem(itemId){
        return new Promise((resolve, reject) => {
            this.db.find({itemId}, (err, ratings) => {
                if(err){
                    reject(`Error getting users by ${itemId}, ${err}`)    
                }
                // console.log(`usersByItem ratings for ${itemId} is`, ratings);
                resolve(_.pluck(ratings, 'userId'));
            })
        })
    }

}



module.exports = {
    Rater,
}