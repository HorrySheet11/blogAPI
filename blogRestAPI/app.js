import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import routes from './routers/usersRouter.js';
import session from "express-session";
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);