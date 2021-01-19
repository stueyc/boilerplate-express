var express = require('express');
var app = express();

console.log("Hello World")

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next()
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', (req, res) => {
  let message = 'Hello json'
  if (process.env.MESSAGE_STYLE == 'uppercase'){
    message = message.toUpperCase()
  }
  res.json({"message": message})
})


app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
},
(req, res) => {
  res.json({"time": req.time})
})

app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word})
})

function nameHandler(req, res) {
  if (req.query.first && req.query.last) {
    res.json({"name": req.query.first + ' ' + req.query.last})
  } else {
    res.send("Missing one or more parameters")
  }
}

app.route('/name')
  .get((req, res) => nameHandler(req, res))
  .post((req, res) => nameHandler(req, res))





















 module.exports = app;
