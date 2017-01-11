const {Rater} = require('./lib/rater.js');
const {Query} = require('./lib/query.js');

const likes = new Rater('likes');
const query = new Query();

// testing likes

Promise.all([
    likes.add('mo', 1),
    likes.add('mo', 2),
    likes.add('mo', 3),
    likes.add('jo', 4),
    likes.add('jo', 5),
    likes.add('ho', 1),
    likes.add('ho', 2),
    likes.add('mo', 5),
    likes.add('ho', 5),
]).then((res) => {
    console.log(res);
    return likes.remove('mo', 2)
}).then((res) => {
    console.log(res);
    return likes.usersByItem(5);
}).then((res) => {
    console.log(res);    
    return likes.itemsByUser('mo');
}).then((res) => {
    console.log(res);    
}).catch((err) => {
    console.log(err);    
});


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

// Promise.all([
//     query.addAge(16),
//     query.addGender('female'),
//     query.addLocation('USA'),
//     query.addSchedule('summer'),
// ])
// .then((res) => {
//     console.log('res is ',res)  
//     query.updateDb();  
// })
// .catch((err) => {
//     console.log('err is ',err);
// });