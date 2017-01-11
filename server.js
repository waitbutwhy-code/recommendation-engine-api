const {Rater} = require('./lib/rater.js');
const {Query} = require('./lib/query.js');

// const likes = new Rater('likes');
const query = new Query();

// testing likes
// likes.add('mo', 1).then((res) => {
//     console.log(res)
// }); 

// testing query

// console.log(query);

// query.addGender('male')
//     .then((res) => {
//         console.log(res);
//         return query.addGender('male');
//     })
//     .then((res) => {
//         console.log(res);
//     });

Promise.all([
    query.addAge(16),
    query.addGender('female'),
    query.addLocation('USA'),
    query.addSchedule('summer'),
])
.then((res) => {
    console.log('res is ',res)  
    query.updateDb();  
})
.catch((err) => {
    console.log('err is ',err);
});