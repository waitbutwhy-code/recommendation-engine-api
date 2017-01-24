const _ = require('underscore');

const {suggestionsDb} = require('./db.js');
const {Similars} = require('./similars.js');
const {Rater} = require('./rater.js');

const similars = new Similars();
const likes = new Rater('likes');
const dislikes = new Rater('dislikes');

// function getAllItems(userId){
//     return new Promise((resolve, reject) => {

//     })
// }

class Suggestions {
    constructor(){
        this.db = suggestionsDb;
    }

    forUser(userId){
        return new Promise((resolve, reject) => {
            this.db.findOne({userId}, (err, {suggestions} = {suggestions: []}) => {
                if(err){
                    reject(err)
                }
                resolve(suggestions);
            })
        })
    }

    update(userId){
        let otherUserSimilarities, userLikes, userDislikes;

        return similars.byUser(userId)
        .then((res) => {
            otherUserSimilarities = res.others;
            return Promise.all([
                likes.itemsByUser(userId),
                dislikes.itemsByUser(userId)
            ])
        })
        .then((res) => {
            this.db.delete({userId});
            userLikes = res[0] , userDislikes = res[1];

            let othersItemsPromise = otherUserSimilarities.map((otherUserSimilarity) => {
                return [
                    likes.itemsByUser(otherUserSimilarity.userId),
                    dislikes.itemsByUser(otherUserSimilarity.userId)
                ];
            })

            console.log('othersItemsPromise' ,othersItemsPromise);
            return Promise.all(_.flatten(othersItemsPromise));
        })
        .then((items) => {
            console.log('items are ' , items);
            let unratedItems = _.difference(_.unique(_.flatten([items])), userLikes, userDislikes);
            console.log('unrated items are ', unratedItems);

        })
    }
}

module.exports = {
  Suggestions,
}
