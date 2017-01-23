const _ = require('underscore');
const {suggestionsDb} = require('./db.js');

class Suggestions {
    constructor(){
        this.db = suggestionsDb;
    }

    forUser(userId){
        
    }
}

module.exports = {
  Suggestions,
}
