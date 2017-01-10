const {Rater} = require('./api/rater.js');

const likes = new Rater('likes');

likes.add('mo', 1).then((res) => {
    console.log(res)
}); 