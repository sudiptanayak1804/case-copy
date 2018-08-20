var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.get('/', function(req, res) {res.render('index')});
app.get('/copy', function(req, res){
	var exec = require('child_process').exec;
	var id = req.query.id;
	var contactid =req.query.contactid;
	var caseid =req.query.caseid;
	var objectName = req.query.objectName;
	var usernameSource = req.query.sourceun;
	var passwordSource = req.query.sourcepw;
	var sectokenSource = req.query.sourcest;
	var domainSource = req.query.sourcedom;
	var domainTarget = req.query.targetdom;
	var passwordTarget = req.query.targetpw;
	var sectokenTarget = req.query.targetst;
	var usernameTarget = req.query.targetun;
	console.log('id= '+id);
	console.log('contactid= '+contactid);
	console.log('caseid= '+caseid);
	console.log('objectName= '+objectName);
	console.log('usernameSource= '+usernameSource);
	console.log('passwordSource= '+passwordSource);
	console.log('sectokenSource= '+sectokenSource);
	console.log('domainSource= '+domainSource);
	console.log('domainTarget= '+domainTarget);
	console.log('passwordTarget= '+passwordTarget);
	console.log('sectokenTarget= '+sectokenTarget);
	console.log('usernameTarget= '+usernameTarget);

exec('./NewMainJob/NewMainJob/NewMainJob_run.sh --context_param SourceURL=\'' + domainSource + 
	'\' --context_param SourceUID=\'' + usernameSource + '\' --context_param SourcePWD=\'' + passwordSource + 
	'\' --context_param SourceSK=\'' + sectokenSource + '\' --context_param TargetURL=\'' + domainTarget + 
	'\' --context_param TargetUID=\'' + usernameTarget + '\' --context_param TargetPWD=\'' + passwordTarget + 
	'\' --context_param TargetSK=\'' + sectokenTarget + '\' --context_param HAId=\'' + id + 
	'\' --context_param ConId=\'' + contactid + '\' --context_param CaseId=\'' + caseid + '\'',
  function (error, stdout, stderr) {
    if (error !== null) {
      console.log(error);
      res.send(stderr);
    } else {
	    console.log('stdout: ' + stdout);
	    res.send(stdout);
    }
});


/*ls = spawn('/Users/sudnayak/Documents/Nodejs/NewMainJob_02/NewMainJob/NewMainJob_run.sh',  ['--context_param SourceUID=\'sudnayak@deloitte.com.isdhfdev\'', '--context_param SourcePWD=\'Hollowm@n44\'', 
	'--context_param SourceSK=\'DbMqYNqvf5STHOkiLxajbgS67\'', '--context_param TargetURL=\'midhs--ISDHFDEV.cs32.my.salesforce.com\'', '--context_param TargetUID=\'sudnayak@deloitte.com.isdhfdev\'', 
	'--context_param TargetPWD=\'Hollowm@n44\'','--context_param TargetSK=\'DbMqYNqvf5STHOkiLxajbgS67\'']);
ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
  res.send(stdout);
});
ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
  res.send(stdout);
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code);
  res.send('Error Code: '+ code);
});*/

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
