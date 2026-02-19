import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import routes from './src/routers/index.js';
import passport from 'passport';
import "./src/config/passport.js";
import bodyParser from 'body-parser';

//FIXME: req.body is undefined
const app = express();
app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (!req.body) req.body = {};
    next(err);
  });
}); 

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Blog API listening on port ${port}!`),
);