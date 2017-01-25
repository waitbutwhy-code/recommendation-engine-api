const _ = require('underscore');

const {suggestionsDb} = require('./db.js');
const {Similars} = require('./similars.js');
const {Rater} = require('./rater.js');

const similars = new Similars();
const likes = new Rater('likes');
const dislikes = new Rater('dislikes');

function getSuggestions(userId, otherUsers ,itemId){
    // 1. get users (likers and dislikers ) from items
    // 2. iterate over users (excluding current user)
    // 3. extract similarity for that user

    return Promise.all([
        likes.usersByItem(itemId),
        dislikes.usersByItem(itemId)
    ]).then((res) => {
        let others = _.without(_.flatten(res), userId);
        
        // TODO replace this piece of code with array.reduce 
        let numerator = 0;
        others.forEach((other) => {

            if(_.findWHere(otherUsers, {
                userId: other
            }) != null ){

            }

        })
    })
}

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
        let otherUsers, userLikes, userDislikes;

        return similars.byUser(userId)
        .then((res) => {
            otherUsers = res.others;
            return Promise.all([
                likes.itemsByUser(userId),
                dislikes.itemsByUser(userId)
            ])
        })
        .then((res) => {
            this.db.delete({userId});
            userLikes = res[0] , userDislikes = res[1];

            let othersItemsPromise = otherUsers.map((otherUser) => {
                return [
                    likes.itemsByUser(otherUser.userId),
                    dislikes.itemsByUser(otherUser.userId)
                ];
            })

            console.log('othersItemsPromise' ,othersItemsPromise);
            return Promise.all(_.flatten(othersItemsPromise));
        })
        .then((items) => {
            // console.log('items are ' , items);
            let unratedItems = _.difference(_.unique(_.flatten([items])), userLikes, userDislikes);
            console.log('unrated items are ', unratedItems);
            this.db.delete({userId});

        })
    }
}

module.exports = {
  Suggestions,
}
