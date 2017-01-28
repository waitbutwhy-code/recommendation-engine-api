const _ = require('underscore');
const Bourne = require('bourne');

// const {similarsDb} = require('./db.js');
// const {Rater} = require('./rater.js');
// const likes = new Rater('likes');
// const dislikes = new Rater('dislikes');

class Similars{
    constructor(engine){
        this.engine = engine;
        this.db = new Bourne('./db-similars.json');
    }

    getOtherUsers(userId, userLikes , userDislikes){
        return new Promise((resolve, reject) => {
            let itemIds = _.flatten([userLikes, userDislikes]);
            let usersByItemPromiseArray = [];

            itemIds.forEach((itemId) => {
                usersByItemPromiseArray.push(this.engine.likes.usersByItem(itemId));
                usersByItemPromiseArray.push(this.engine.dislikes.usersByItem(itemId));
            });
            
            Promise.all(usersByItemPromiseArray)
            .then((allUserIds) => {
                var otherUserIds = _.without(_.unique(_.flatten(allUserIds)), userId);
                resolve(otherUserIds);
            });
        });
    }


    getSimilarity(userLikes, userDislikes, otherUserId){
        return Promise.all([
            this.engine.likes.itemsByUser(otherUserId),
            this.engine.dislikes.itemsByUser(otherUserId)
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
            return {userId: otherUserId, similarity};
        })
    }

    byUser(userId){
        return new Promise((resolve, reject) => {
            this.db.findOne({userId}, (err, similarities) => {
                if(err){
                    reject(`Unabele to findOne user ${userId} `, err);
                }

                resolve(similarities);
            })
        })
    }

    update(userId){
        let userLikes;
        let userDislikes; 
        return Promise.all([
            this.engine.likes.itemsByUser(userId),
            this.engine.dislikes.itemsByUser(userId)
        ])
        .then((res) => {
            userLikes  = res[0];
            userDislikes = res[1];
            return this.getOtherUsers(userId, userLikes, userDislikes);
        }).then((otherUserIds) => {

            let similarities = otherUserIds.map((otherUserId) => {
              return this.getSimilarity(userLikes,userDislikes, otherUserId);  
            });

            return Promise.all([...similarities]);
        }).then((similarities) => {
            this.db.insert({userId, others: similarities});
            return similarities;
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