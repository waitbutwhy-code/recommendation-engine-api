const _ = require('underscore');
const Bourne = require('bourne');

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
}

module.exports = {
    Similars,
}