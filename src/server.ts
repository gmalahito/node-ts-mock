import app from './app';

const port: number = parseInt(process.env.NODE_PORT) || 3000;
const hostname: string = process.env.NODE_HOST || '127.0.0.1';

app.listen(port, hostname, () => {
    return console.log(`Server is listening on ${port}`);
});