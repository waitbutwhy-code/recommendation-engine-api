const {Rater} = require('./lib/rater.js');

const likes = new Rater('likes');

likes.add('mo', 1).then((res) => {
    console.log(res)
}); 