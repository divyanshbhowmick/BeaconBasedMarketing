const express = require('express')
const app = express()
var path = require('path')
const port = 3000
var bodyParser = require("body-parser");
const fs = require('fs')
const shell = require('shelljs');
var info = [
  {
    id: "1",
    name: "Nike Air Zooom",
    offer: "Flat 20% OFF!",
    imageUrl: "http://192.168.137.185:3000/products/shoes.jpg"
  },
  {
    id: "2",
    name: "HRX Sweatshirt",
    offer: "BUY 2 GET 1 FREE!",
    imageUrl: "http://192.168.137.185:3000/products/sweatshirt.jpg"
  },
  {
    id: "3",
    name: "Fastrack Watch",
    offer: "Upto 30% OFF!",
    imageUrl: "http://192.168.137.185:3000/products/watch.jpg"
  },
  {
    id: "4",
    name: "Solid Yellow T-shirt",
    offer: "Flat 10% OFF!",
    imageUrl: "http://192.168.137.185:3000/products/tshirt.jpg"
  }
];

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get("/info", (req, resp) => {
  itemId = req.query.id;
  info.forEach(item => {
    if (itemId == item.id) {
      resp.json(item);
    }
  });
});

app.post('/getUrl', (req, resp) => {
    url = req.body.value;
    console.log(url);
    fs.writeFileSync('test.txt', url, (err) => {
        if (err) throw err;
    });
    shell.exec('./script')
    console.log("Done executing");
    resp.send('Done!')
    resp.end('ok  bye!')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
