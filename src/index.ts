import express from 'express';
import {helloHandler, rootHandler} from './handlers';

const app = express();
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

app.listen(port, () => console.log(`Server is listening on ${port}`));