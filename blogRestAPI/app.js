import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import routes from './src/routers/usersRouter.js';
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);''