import app from './app';

const port = 3000;
const hostname = '127.0.0.1';

app.listen( port, hostname, () => {
    return console.log(`Server is listening on ${port}`);
});