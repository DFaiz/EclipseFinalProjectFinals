var express = require('express');
var bodyParser = require('body-parser');
var mysql = require ('mysql');
var winston = require('winston');

var app = express();

//Init Winston logger, max file size 5MB with 10 file retention
winston.add(winston.transports.File, { filename: './logs/eclipse_server.log', level: 'info',handleExceptions: true,
            maxsize: 5242880,maxFiles: 10});
winston.remove(winston.transports.Console);

winston.log('info', '*********************************************************');
winston.log('info', '*********************************************************');
winston.log('info', '*********************************************************');
winston.log('info', 'Eclipse web server - start up process');
winston.log('info', 'Express server mode initialized');  				
winston.log('info', 'Initialize database connection');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '12345678',
	database: 'project_eclipse',
	port: 3306 });

	winston.log('info', 'Database connection initialized');
	winston.log('info', 'Database connection attempted');
	connection.connect(function(err){
	if(!err) {
		console.log("Database is connected ... \n\n");  
		winston.log('info', 'Database connection success - connected');	
	} else {
		winston.log('error', 'Database connection - failed');	
		winston.log('error', err);	
		console.log("Error connecting database ... \n\n");  
	}
	});	

	
// instruct the app to use the `bodyParser()` middleware for all routes

winston.log('info', 'using bodyParser()');	
app.use(bodyParser());
winston.log('info', 'using bodyParser.text()');	
app.use(bodyParser.text());
winston.log('info', 'initialize HTML directory');
app.use(express.static(__dirname + '/public'));
winston.log('info', 'initialized HTML directory');

app.post('/gamelogin', function(request, response){
//app.post('/', function(request, response){
    winston.log('info', 'In game POST login request recieved');
    console.log('searching for user:  ',request.body.usr);
    //console.log(request.body.pass);
    var usr = request.body.usr;
    var pass = request.body.pass;
	
    var client_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
	
     winston.log('info', 'login request recieved from IP:'+client_ip+ ' for user: '+usr);
	
	connection.query('SELECT * FROM eclipse_users WHERE username=? AND password = md5(?)', [ usr, pass ], function(err, rows, fields) {
	
	  if (!err)
	  {
		//console.log('The solution is: ', rows);
		var n_rows = rows.length;
		console.log('number of rows returned: ',n_rows);
		 if(n_rows==1)
		 {	 
		    //user exists
			winston.log('info', 'user exists - checking if user already logged in');
			//Check if user is already logged in or not
			
			//Check field value
			if(rows[0].logged==0)
			{	
				winston.log('info', usr + 'is not double logged-in');
				//Update that user has logged in
				winston.log('info', 'update logged value to true');
				connection.query('UPDATE eclipse_users SET logged=1,user_hb_stamp = (SELECT NOW()) where username = ?', [usr], function(err, rows, fields) {
				if (!err)
				{	
					//console.log('updated logged value to 1');
					//response code 2
					winston.log('info', 'logged value was set to true');
					winston.log('info', 'user exists - response will be send - login success');
					response.json({msg:'user exists'});
					winston.log('info', 'user exists - response sent - login success');
				}
				else
				{	
					//SQL query error
					//response code 4
					console.log('Error while performing Query.');
					winston.log('error', 'Error while performing select query');	
					winston.log('error', err);
					response.json({msg:'database query failure'});
					connection.end();
				}
				});
			}
			else
			{	
				//response code 3
				winston.log('error', 'user already logged in - cannot double login');
				response.json({msg:'user already logged in'});
				winston.log('error', 'user already logged in - response sent - login failed');
			}
		 }
		else
		{
			//user not found //response code 1
			winston.log('info', 'login failed - response will be send');
			response.json({msg:'user does not exist'});
			winston.log('info', 'login failed - response sent');
		}
	  }
	 else
		//SQL query error
		//response code 4
		{console.log('Error while performing Query.');
		winston.log('error', 'Error while performing gamelogin select query');	
		winston.log('error', err);
		response.json({msg:'database query failure'});
		winston.log('info', 'terminating SQL connection - restart server');	
		connection.end();}
	  });
});

app.post('/weblogin', function(request, response){

	winston.log('info', 'web POST login request recieved');
    console.log('searching for user:  ',request.body.username);
    //console.log(request.body.pass);
    var usr = request.body.username;
    var pass = request.body.pwd1;

    var client_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
	
	winston.log('info', 'web login request recieved from IP:'+client_ip+ ' for user: '+usr);
	
	connection.query('SELECT * FROM eclipse_users WHERE username=? AND password = md5(?)', [ usr, pass ], function(err, rows, fields) {
	
	  if (!err)
	  {
		//console.log('The solution is: ', rows);
		var n_rows = rows.length;
		console.log('number of rows returned: ',n_rows);
		 if(n_rows==1)
		 {
			//user exists
			winston.log('info', 'user exists - response will be send');
			//response.send('1');
			//console.log(rows[0].logged);
			response.writeHead(301,{Location: 'http://52.24.91.179:80/index.html'});
			response.end();
			winston.log('info', 'user exists - response sent');
		 }
		else{
			//user does not exist
			//response.send('Login failed - Please check username and password');
			winston.log('error', 'login failed - response will be send');
			response.send('EROR - Login failed');
			winston.log('error', 'login failed - response sent');
		}
	}
	  else
		//SQL query error
		{console.log('Error while performing Query.');
		winston.log('error', 'Error while performing weblogin select query');	
		winston.log('error', err);
		winston.log('info', 'terminating SQL connection - restart server');	
		connection.end();}
	  });
});

app.post('/registeruser', function(request, response) {
	
    var usr = request.body.username;
	var pass = request.body.pwd1;
    var uemail = request.body.mail;

	winston.log('info', 'web POST register user request recieved');	
	winston.log('info', 'Checking if user/email already registered ');
    winston.log('info', 'preparing ifsql query');
	
	connection.query('SELECT * FROM eclipse_users WHERE username=? OR email=?', [usr,uemail], function(err, rows) {
	
	if (!err)
	{	
		var n_rows = rows.length;
		if(n_rows==0)
		{
			winston.log('info', 'username/email not used');
			winston.log('info', 'To register user  '+ usr);
			winston.log('info', 'preparing sql query');
			var register_userQ = connection.query('INSERT INTO eclipse_users (username, password,email,logged) VALUES (?, md5(?),?,0)', [ usr, pass,uemail ], function(err,result) {
			
			if (!err)
			{
				console.log('new user was registered   ' + usr);
				winston.log('info', 'new user was registered   ' + usr);
				response.writeHead(301,{Location: 'http://52.24.91.179:80/downlod.html'});
				response.end();
			}
			else
			{
				console.log('register query error');
				winston.log('error', 'Error while performing register - insert query');	
				winston.log('error', err);
				response.send('ERROR - server error was encountered - please try again later');
				winston.log('info', 'terminating SQL connection - restart server');	
				connection.end();
			}
			
			});
			
		}
		else
		{
			winston.log('info', 'username/email already exist - response will be send');
			response.send('ERROR - username or email already registered');
			winston.log('info', 'response will be sent');	
		}
		
	}
	else
	{
		console.log('checkif query error');
		winston.log('error', 'Error while performing register - select check if query');	
		winston.log('error', err);
		response.send('ERROR - server error was encountered - please try again later');
		winston.log('info', 'terminating SQL connection - restart server');	
		connection.end();	
	}
	});	
});

app.post('/userlogout', function(request, response){

    winston.log('info', 'in game POST logout user request recieved');
    console.log('searching for user:  ',request.body.usr);
    var usr = request.body.usr;

    var client_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
	
	winston.log('info', 'logout user request recieved from IP:'+client_ip+ ' for user: '+usr);
	
	connection.query('UPDATE eclipse_users SET logged=0,user_hb_stamp = (SELECT NOW()) where username = ?', [usr], function(err, rows, fields)
	{
		if (!err)
		{	
			winston.log('info', 'logged value was set to false');
			winston.log('info', 'response will be send - logout success');
			response.json({msg:'user status was set to logout'});
			winston.log('info', 'response sent - logout success');
		}
		else
		{	
			console.log('Error while performing userlogout Query.');
			winston.log('error', 'Error while performing userlogout select query');	
			winston.log('error', err);
			response.json({msg:'database query failure'});
			connection.end();
		}
	});
});

winston.log('info', 'binding port 80 on IP 172.31.16.218');
app.listen(80,"172.31.16.218");
winston.log('info', 'server running at http://172.31.16.218:80');
console.log('Server running at http://172.31.16.218:80/');