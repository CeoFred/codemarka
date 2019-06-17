const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
var compression = require('compression')

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to mongodo')
});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(compression())

app.get('/', (req, res) => res.send('Hello World!'))

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})

  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })
  app.use(express.static('public'))
//   app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))