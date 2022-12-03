const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const registerRoute = require('./router/register');
const signInRoute = require('./router/signin');
const usersRoute = require('./router/users');
const booksRoute = require('./router/books')
const secret = process.env.SECRET;
const PORT = process.env.PORT || 5000;
const url = process.env.MONGO;

mongoose.connect(url)
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors())

app.use('/v1/books', (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);

    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                return res.status(500).json({
                    status: "Failed to decode",
                    error: err.message
                })
            }
            if(decoded) {
                req.user = decoded.data;
                next();
            }
        })
    } else {
        return res.status(403).json({
            status: "Failed",
            message: "Invalid Token"
        })
    }
})

app.use('/v1/register', registerRoute);
app.use('/v1/signin', signInRoute);
app.use('/v1/users', usersRoute);
app.use('/v1/books', booksRoute);

app.listen(PORT, () => console.log(`Server is up at ${PORT} port`))