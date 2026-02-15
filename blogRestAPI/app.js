import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import routes from './src/routers/index.js';
import passport from 'passport';
import "./src/config/passport.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Blog API listening on port ${port}!`),
);