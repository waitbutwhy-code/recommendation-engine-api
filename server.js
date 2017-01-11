const {Rater} = require('./lib/rater.js');
const {Query} = require('./lib/query.js');

const likes = new Rater('likes');
const query = new Query();

// testing likes
// likes.add('mo', 1).then((res) => {
//     console.log(res)
// }); 

// testing query

console.log(query);

query.addGender('male')
    .then((res) => {
        console.log(res);
        return query.addGender('male');
    })
    .then((res) => {
        console.log(res);
    });