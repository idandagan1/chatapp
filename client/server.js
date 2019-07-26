const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(process.env.REACT_APP_SECRET_CODE);

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
