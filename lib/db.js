const Bourne = require('bourne');
const likeDb = new Bourne(`./db-likes.json`);
const dislikeDb = new Bourne(`./db-dislikes.json`);
const similarsDb = new Bourne('./db-similars.json');
const suggestionsDb = new Bourne('./db-suggestions.json');
const queryDb = new Bourne('./db-query.json');

module.exports = {
    likeDb,
    dislikeDb,
    similarsDb,
    suggestionsDb,
    queryDb
}