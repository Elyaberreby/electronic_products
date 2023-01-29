const express = require('express');
const app = express();
const electronicRouter = require('./routes/electronicProducts');

app.use('/api', electronicRouter);
app.listen(1234, () => {
    console.log('Server started on port 1234');
});
