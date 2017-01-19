const _ = require('underscore');
const Bourne = require('bourne');

const {Rater} = require('./rater.js');
const likes = new Rater('likes');
const dislikes = new Rater('dislikes');

function getOtherUsers(userId,userLikes , userDislikes){
    return new Promise((resolve, reject) => {
        let itemIds = _.flatten([userLikes, userDislikes]);
        let usersByItemPromiseArray = [];

        itemIds.forEach((itemId) => {
            usersByItemPromiseArray.push(likes.usersByItem(itemId));
            usersByItemPromiseArray.push(dislikes.usersByItem(itemId));
        });
        
        Promise.all(usersByItemPromiseArray)
        .then((allUserIds) => {
            var otherUserIds = _.without(_.unique(_.flatten(allUserIds)), userId);
            resolve(otherUserIds);
        });
    });
    
    

}

class Similars{
    constructor(){
        this.db = new Bourne('./db-similars.json');
    }

    byUser(userId){
        return new Promise((resolve, reject) => {
            this.db.findOne({userId}, (err, res) => {
                if(err){
                    reject(`Unabele to findOne user ${userId} `, err);
                }

                resolve(res);
            })
        })
    }

    update(userId){

        return Promise.all([
            likes.itemsByUser(userId),
            dislikes.itemsByUser(userId)
        ])
        .then((res) => {
            let userLikes  = res[0];
            let userDislikes = res[1];
            return getOtherUsers(userId, userLikes, userDislikes);
        }).then((otherUserIds) => {

            console.log('otherUserIds is ',otherUserIds);

        })
        // 1. get items for likes and dislikes
        // 2. get users for items likes and dislikes
        // 3. get all unique users and remove current user 
        // 4. for other users get likes and dislikes
        // 5. calculate similarity

    }
}

module.exports = {
    Similars,
}