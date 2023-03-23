import express from 'express';
import UserRouter from 'routes/index.js';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/', UserRouter);


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Server not working properly';

    res.status(statusCode).send({
        message
    });
});


app.listen(4000, () => {
    console.log('Server is listening at port 4000');
});

