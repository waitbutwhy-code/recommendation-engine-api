const _ = require('underscore');
const Bourne = require('bourne');

const {Rater} = require('./rater.js');
const likes = new Rater('likes');
const dislikes = new Rater('dislikes');

function getOtherUsers(userLikes , userDislikes){
    let itemIds = _.flatten([userLikes, userDislikes]);
    // let allUserIdsPromises = itemIds.map((itemId) => {
    //     return Promise.all([
    //         likes.usersByItem(itemId),
    //         dislikes.usersByItem(itemId)
    //     ])
    // })

    let allUserIds = [];

    for(i = 0 ; i < itemIds.length ; i++){

        likes.usersByItem(itemIds[i])
        .then((res) => {
            allUserIds.push(res);
            return dislikes.usersByItem(itemIds[i])
        }).then((res) => {
            allUserIds.push(res);   
             console.log('allUserIds is ', allUserIds);         
        })
    };

    console.log('allUserIds is ', allUserIds);

    // var results = itemIds.map((itemId) => {
    //     return Promise.all([
    //         likes.usersByItem(itemId),
    //         dislikes.usersByItem(itemId)
    //     ]).then((res) => {
    //         allUserIds.push(res[0]);
    //         allUserIds.push(res[1]);
    //         return new Promise((resolve, reject) => {
    //             resolve(allUserIds);
    //         })
    //     })
    // })

    // console.log(results);   



    // console.log('allUserIds are ', allUserIds);

    // Promise.all(allUserIdsPromises).then((res) => {
    //     console.log('allUserIds are ', res);
    // })

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
            getOtherUsers(userLikes, userDislikes);
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