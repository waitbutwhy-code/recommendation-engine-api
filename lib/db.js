const Bourne = require('bourne');
const likeDb = new Bourne(`./db-likes.json`);
const dislikeDb = new Bourne(`./db-dislikes.json`);
const similarsDb = new Bourne('./db-similars.json');

module.exports = {
    likeDb,
    dislikeDb,
    similarsDb,
}