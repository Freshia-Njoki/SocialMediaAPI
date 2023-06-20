import express from 'express';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js'
import config from './db/config.js'


const app = express ();

//middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//jwt middleware
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});


userRoutes(app);
postRoutes(app);
commentsRoutes(app);

app.get('/', (req, res) => {
    res.send('hello welcome to my Info system')
    
})

//server should  listen to our configs >> obj
app.listen(config.port, () => {
    console.log(`server is running at ${config.url}`);
})