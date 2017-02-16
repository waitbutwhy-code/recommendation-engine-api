const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {Engine} = require('./lib/engine.js');

const e = new Engine;
const likes = e.likes;
const dislikes = e.dislikes;
const similars = e.similars;
const suggestions = e.suggestions;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Recommendation api');
});

app.post('/likes' , (req, res)=> {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    if ( userId === undefined || itemId === undefined) {
        return res.status(400).send();
    }

    console.log('reqest userId is ', userId);
    console.log('reqest itemId is ', itemId);

    likes.add(userId, itemId).then((result) => {
            return res.status(200).send(result);
    }).catch((e) => {
        return res.status(500).send(e);
    })

})


app.post('/dislikes' , (req, res)=> {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    if ( userId === undefined || itemId === undefined) {
        return res.status(400).send();
    }

    console.log('reqest userId is ', userId);
    console.log('reqest itemId is ', itemId);

    dislikes.add(userId, itemId).then((result) => {
            return res.status(200).send(result);
    }).catch((e) => {
        return res.status(500).send(e);
    })

})

// currently isnt working, needs some adjustments ()
app.get('/suggestions', (req, res) => {
    const userId = req.body.userId;
    suggestions.forUser(userId).then((result) => {
        return res.send(result);
    }).catch((e) => {
        return res.status(500).json(e);        
    });
})

app.listen(PORT, () => {
    console.log('Recommendation api is listenting on ', PORT);
});

// for testing
module.exports = {app};

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
// })
// .then((res) => {
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
// .then((res) => {
//     console.log('suggestions update is ', res);
// })
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