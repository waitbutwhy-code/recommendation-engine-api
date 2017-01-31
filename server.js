const express = require('express');
const {Engine} = require('./lib/engine.js');
var bodyParser = require('body-parser');


const e = new Engine;
const likes = e.likes;
const dislikes = e.dislikes;
const similars = e.similars;
const suggestions = e.suggestions;

const PORT = process.env.PORT || 3003;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Recommendation api');
});

app.post('/likes' , (req, res)=> {
    // const userId = parseInt(req.params.id, 10);
    // const body = _.pick(req.body, "name", "completed", "movieId");

    const userId = req.body.userId;
    const movieId = req.body.movieId;

    console.log('reqest userId is ', userId);
    console.log('reqest movieId is ', movieId);

    likes.add(userId, movieId)
        .then((res) => {
            res.status(400).send();
        })
    .catch((e) => {
        res.status(500).json(e);
    })

})

// app.put('/dislikes/:id', (req, res) => {
//     const userId = parseInt(req.params.id, 10);
//     const body = _.pick(req.body, "name", "completed", "movieId");

//     dislikes.add(userId, body.movieId)
//         .then((res) => {
//             res.status(400).send();
//         })
//         .catch((e) => {
//             res.status(500).json(e);
//         })
// })

// app.get('/suggestions/:id', (req, res) => {
//     const userId = parseInt(req.params.id, 10);
//     const body = _.pick(req.body, "name", "completed", "movieId");

//     suggestions.byUser(userId);  
// })

app.listen(PORT, () => {
    console.log('Recommendation api is listenting on ', PORT);
})

// Promise.all([
//     likes.add('mo', 1),
//     likes.add('mo', 2),
//     likes.add('mo', 3),
//     likes.add('jo', 4),
//     likes.add('jo', 5),
//     likes.add('ho', 1),
//     likes.add('ho', 2),
//     likes.add('mo', 5),
//     likes.add('ho', 5),
//     dislikes.add('mo', 8),
//     dislikes.add('mo', 11),
//     dislikes.add('mo', 12),
//     dislikes.add('ho', 11),
//     dislikes.add('ho', 9),
//     dislikes.add('jo', 9),
// ])
// .then((res) => {
//     console.log(res);
//     return likes.remove('mo', 2)
// }).then((res) => {
//     console.log(res);
//     return likes.usersByItem(5);
// }).then((res) => {
//     console.log(res);    
//     return likes.itemsByUser('mo');
// })
// .then((res) => {
//     console.log(res);
//     return similars.byUser('mo');    
// })
// .then((res) => {
//     console.log('byUser is ', res);
//     return similars.update('mo');    
// })
// .then((res) => {
//     // console.log('similarities are ', res);
//     return suggestions.update('mo');
// })
// // .then((res) => {
// //     console.log('suggestions update is ', res);
// // })
// .catch((err) => {
//     console.log(err);    
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