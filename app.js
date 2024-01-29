//const { connect } = require('http2');
var express = require('express'),
   path = require('path'),
   bodyParser = require('body-parser'),
   cons = require('consolidate'),
   dust = require('dustjs-helpers'),
   pg = require('pg'),
   app = express();
// DB CONNECTION
//var connect = "postgres://gauri:12345@localhost:5432/EmployeeDB";
var config = require('./config/index');
// DB CONNECTION
var connectionConfig = config.development; // Choose the environment based on your deployment environment
var connect = `postgres://${connectionConfig.username}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`;

// ASSIGN dust engine
app.engine('dust', cons.dust);
// SET Default ext as .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pool = new pg.Pool({
   connectionString: connect,
   password: connectionConfig.password,
});
app.get('/', function (req, res) {
   // PG Connect
   pool.connect(function (err, client, done) {
       if (err) {
           return console.error('error fetching client from pool', err);
       }
       client.query('SELECT * FROM employee', function (err, result) {
           if (err) {
               return console.error('error in query', err);
           }
           res.render('index',{Employee: result.rows});
       });
   });
});

app.post('/add', function(req,res){
    pool.connect(function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('INSERT INTO employee("ID","Name","Domain","Salary") VALUES($1,$2,$3,$4)',[req.body.ID, req.body.Name, req.body.Domain, req.body.Salary]);
        done();
        res.redirect('/');
    });

})

app.delete('/delete/:ID', function (req, res) {
   // PG Connect
   pool.connect(function (err, client, done) {
       if (err) {
           return console.error('error fetching client from pool', err);
       }
       client.query('Delete From employee Where "ID"=$1', [req.params.ID]);
         done();
       res.send(200);
   });
});

// Server
app.listen(3000, function () {
   console.log('server at 3000');
});