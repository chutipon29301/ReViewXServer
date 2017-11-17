### Data Schema
For all object, they will have their own primary key `_id` except for object inside object

e.g.
```javascript
a = {
    '_id': 'fm834whtnfv9awhgj9aw4g',
    ...
}
```

### UserObject
Contain information about user
```javascript
user = {
    _id: 'q39u4g9nu42wbfs9eru4g4fwf',
    facebookID: 1028867817161628,
    preference: {
        like: [
            '3uht9gpa34qu9g4bgfw4',...
        ],
        dislike: [
            '3uht9gpa34qu9g4bgfw4',...
        ]
    },
    rank: 19
    readLaterID: [
        'y3w8faby3wfa83yaeg4u4ga4w',
        'gae4sy8awyr3bfaw84tgya4g4',
        ...
    ]
}
```

### ReviewObject
Contain information about review
```javascript
review = {
    _id: '4c9thv3q4m0c9h34tv343t4v43'
    reviewer: '3u49htn92ng4hq3uh4wtngu34g',
    score: 70,
    threeWords: [
        '','',''
    ]
    review: '',
    point: 1453,
    pic: 'http://',
    movieID: '34j7gh9a42ugbe4gawf4wg4g'
}
```

### MovieObject
Contain information about movie
```javascript
movie = {
    _id: '28yfa8rvganw3rg8c4248vg37ra4cqt4'
    name: 'Star Wars',
    genre: [
        '249tgha48fb4a39t34t4343',
        'a3u84goqg472hf3aq4g43',
        '234yfg8q3o47fhp38hf348fhpw4f',
        ...
    ],
    pic: 'http://',
    releaseDate: new Date()
}
```

### GenreObject
```javascript
genre = {
    _id: '439huf934f38y48gfyf32f32',
    name: ''
}
```

### Post method
`post/listGenre`

- request body
```javascript
body = {
}
```
- response body
```javascript
body = {
    genres: [
        {
            genreID: 'ngieauu4g0b9a4gbu3ag34gaw',
            genreName: 'action'
        },
        {
            genreID: 'a3w4jiugbaehw4fwaiu4f4g4',
            genreName: 'sci-fi'
        }
    ]
}
```

`post/registerUser`

- request body
```javascript
body = {
    facebookID: 3841928423432,
    preference: {
        like: [
            '3uht9gpa34qu9g4bgfw4',...
        ],
        dislike: [
            '3uht9gpa34qu9g4bgfw4',...
        ]
    }
}
```

- response body
```javascript
body = {
    msg: 'OK'
}

body = {
    err: -1,
    msg: 'Bad request'
}
```

`post/listMovieSuggestion`

- request body
```javascript
body = {
    facebookID: 3841928423432
}
```

- response body
```javascript
body = {
    movies: [
        {
            movieID: 'dsfn9u43tyg8afw4ba4uageh',
            movieName: 'Star Wars',
            releaseDate: '14/12/2017',
            genre: [
                'animation',
                'family',
                'fantasy'
            ],
            score: 98,
            pic: 'http://www.google.com'
        },
        ...
    ]
}
```

`post/listMovieSuggestion`

- request body
```javascript
body = {
    movieID: 3841928423432
}
```

- response body
```javascript
body = {
    'plot': '',
    'director': [
        '','','','',...
    ],
    'actor': [
        '','','','',...
    ],
    'trailer': 'http://www.youtube.com'
}
```

`post/listReviewSuggestion`

- request body
```javascript
body = {
    movieID: 3841928423432
}
```

- response body
```javascript
body = {
    reviews: [
        {
            reviewID: 'dsfn9u43tyg8afw4ba4uageh',
            movieName: 'Star Wars',
            reviewer: 'Ming Yanisa',
            threeWords: [
                'beautiful',
                'emotional',
                'terrible'
            ],
            score: 98,
            point: 143,
            pic: 'http://www.google.com',
            review: 'Long time ago, in the galaxy far far away',

        },
        ...
    ]
}
```

`post/listMovieSearch`

- request body
```javascript
body = {
}
```

- response body
```javascript
body = {
    movies: [
        {
            movieID: '3rh9q3479hq93fghfh394t43',
            pic: 'http://www.google.com',
            movieName :'Star Wars'
        },
        ...
    ]
}
```

`post/addReview`

- request body
```javascript
body = {
    facebookID: 3841928423432,
    movieID: 'dsfn9u43tyg8afw4ba4uageh',
    pic: 'http://www.google.com',
    threeWord: [
        '','',''
    ],
    review: '',
    score: 100
}
```

- response body
```javascript
body = {
    msg: 'OK'
}
```

`post/modifyPoint`

- request body
```javascript
body = {
    facebookID: 3841928423432,
    reviewID: 'dsfn9u43tyg8afw4ba4uageh',
    point: 1 // 0, -1
}
```

- response body
```javascript
body = {
    msg: 'OK'
}
```

`post/modifyReadLater`

- request body
```javascript
body = {
    facebookID: 3841928423432,
    reviewID: 'dsfn9u43tyg8afw4ba4uageh'
}
```

- response body
```javascript
body = {
    msg: 'OK'
}
```

`post/listReadLater`

- request body
```javascript
body = {
    facebookID: 3841928423432
}
```

- response body
```javascript
body = {
    reviewID: [
        'nu3428qhwfr7439f43tg',
        'nu3428qhwfr7439f43tg',
        'nu3428qhwfr7439f43tg',
        ...
    ]
}
```

`post/listMyReview`

- request body
```javascript
body = {
    facebookID: 3841928423432
}
```

- response body
```javascript
body = {
    reviewID: [
        'nu3428qhwfr7439f43tg',
        'nu3428qhwfr7439f43tg',
        'nu3428qhwfr7439f43tg',
        ...
    ]
}
```

`post/listNearBy`

- request body
```javascript
body = {
}
```

- response body
```javascript
body = {
    locations: [
        {
            x: 120.156468482,
            y: 1852.1066151231065,
            name: 'Paragon',
            address: 'Paragon 6th floor'
        },
        ...
    ]
}
```

`post/random`

- request body
```javascript
body = {
    facebookID: 3841928423432
}
```

- response body
```javascript
body = {
    locations: [
        {
            x: 120.156468482,
            y: 1852.1066151231065,
            name: 'Paragon',
            address: 'Paragon 6th floor'
        },
        ...
    ]
}
```

`post/checkUser`

- request body
```javascript
body = {
    facebookID: 3841928423432
}
```

- response body
```javascript
body = {
    isRegistered: true
}
```