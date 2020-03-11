const express = require('express')
const app = express()
var path = require('path')
const port = 3000
var bodyParser = require("body-parser");
const fs = require('fs')
const shell = require('shelljs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.post('/getUrl', (req, resp) => {
    url = req.body.value;
    console.log(url);
	shell.exec('./script')
console.log("Done executing");
    fs.writeFile('test.txt', url, (err) => {
        if (err) throw err;
    });
    resp.send('Done!')
    resp.end('ok  bye!')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))