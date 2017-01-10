const _ = require('underscore');
const Bourne = require('bourne');

class Rater {
    constructor(type){
        this.type = type;
        this.db = new Bourne(`./db-${type}.json`);
    }

    add(user){
        console.log(`Add user of type ${this.type}`);

    }
}

/*
Add function to add a user
*/

module.exports = {
    Rater,
}