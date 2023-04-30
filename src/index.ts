import express from 'express';
import routes from './routes';
import _default from '../config/default';
import startDB from '../config/db';

require('dotenv').config();

const cors = require('cors');
const path = require('path');

const port = _default.port;
const app = express();

app.use('/files', express.static(path.resolve(__dirname, "uploads")))
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`Server init http://localhost:${port}`);
    startDB();
});
