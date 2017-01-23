const _ = require('underscore');
const {similarsDb} = require('./db.js');
const {Rater} = require('./rater.js');
const likes = new Rater('likes');
const dislikes = new Rater('dislikes');

function getOtherUsers(userId, userLikes , userDislikes){
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

function getSimilarity(userLikes, userDislikes, otherUserId){
    return Promise.all([
        likes.itemsByUser(otherUserId),
        dislikes.itemsByUser(otherUserId)
    ])
    .then((res) => {
        let otherLikes = res[0];
        let otherDislikes = res[1];
//  S(A,B) = |ALikes ∩ BLikes| + |ADislikes ∩ BDislikes| - |ALikes ∩ BDislikes| - |ADislikes ∩ BLikes|  / |ALikes ∪ BLikes ∪ ADislikes ∪ BDislikes|
        let similarity =  ( _.intersection(userLikes, otherLikes).length 
                            + _.intersection(userDislikes, otherDislikes).length
                            - _.intersection(userLikes, otherDislikes).length
                            - _.intersection(userDislikes, otherLikes).length) 
                            / _.union(userLikes, otherLikes, userDislikes, otherDislikes).length 
        return similarity;
    })
}

class Similars{
    constructor(){
        this.db = similarsDb;
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
        let userLikes;
        let userDislikes; 
        return Promise.all([
            likes.itemsByUser(userId),
            dislikes.itemsByUser(userId)
        ])
        .then((res) => {
            userLikes  = res[0];
            userDislikes = res[1];
            return getOtherUsers(userId, userLikes, userDislikes);
        }).then((otherUserIds) => {

            // console.log('otherUserIds is ',otherUserIds);
            otherUserIds.forEach((otherUserId) => {
                getSimilarity(userLikes,userDislikes, otherUserId)
                .then((res) => {
                console.log('similarity is ', res);
                    
                });
            })


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