var express = require('express');
var bodyParser = require('body-parser');
var mysql = require ('mysql');
var winston = require('winston');

var app = express();

//Init Winston logger, max file size 5MB with 10 file retention
winston.add(winston.transports.File, { filename: './logs/eclipse_server_highscores.log', level: 'info',handleExceptions: true,
            maxsize: 5242880,maxFiles: 10});
winston.remove(winston.transports.Console);

winston.log('info', '********************************************************');
winston.log('info', '********************************************************');
winston.log('info', '********************************************************');
winston.log('info', 'Eclipse sub_web server - high scores - start up process');
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

app.post('/update_highscores', function(request, response){
	
	var usr = request.body.usr;
	//Get the new values
	var new_kills = parseInt(request.body.ukills, 10);
	var new_deaths = parseInt(request.body.udeaths,10);
    winston.log('info', 'In game POST update highscores request received        '+usr+'  '+new_kills+'  '+new_deaths);
	console.log('update_highscores searching for user:  ',usr);
    
	var client_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
	
    winston.log('info', 'highscores update request recieved from IP:'+client_ip+ ' for user: '+usr);
	winston.log('info', 'searching for user:  '+usr);
	
	//We get the user id back here!
	connection.query ('SELECT user_id FROM eclipse_users WHERE username=?', [ usr ], function(err, rows, fields) {
	
	if (!err)
	{
		winston.log('info', 'select user query executed successfully');
		var n_rows = rows.length;
		//check if indeed only 1 user was returned.
		if(n_rows==1)
		{
			//ok - single user was returned
			winston.log('info', 'single user returned - gettting user ID');
			var usr_id = rows[0].user_id;
			winston.log('info', 'getting user row from HS table '+usr_id);
			connection.query ('SELECT * FROM eclipse_highscores WHERE user_id=?', [ usr_id ], function(err, rows, fields) {
			
			if(!err)
			{
				winston.log('info', 'select HS row query successful');
				if(n_rows==1)
				{
					//ok - single user was returned
					winston.log('info', 'single user returned');
					//Time to perform the update:
					
					var upk = (new_kills - 0) + (rows[0].number_of_kills - 0);
					var upd = (new_deaths - 0) + (rows[0].number_of_deaths - 0);
					
					//var upk = new_kills + rows[0].number_of_kills;
					//var upd = new_deaths + rows[0].number_of_deaths;
					winston.log('info', 'Time to perform the update new values are:  '+upd+'  '  +upk);
					connection.query ('UPDATE eclipse_highscores SET number_of_kills = ?,number_of_deaths = ? WHERE user_id=?', [ upk,upd,usr_id ], function(err, rows, fields) {
					
					if(!err)
					{
						winston.log('info', 'highscores were updated for user '+usr);
						response.json({msg:'highscores were updated'});
					}
					else
					{
						winston.log('error', 'Error while performing update_highscores update query');	
						winston.log('error', err);
						response.json({msg:'ERROR - server error was encountered - new stats will not be updated'});
						winston.log('info', 'terminating SQL connection - restart server');	
						connection.end();
					}
						
						
					});
				}
				
				else
				{
					//bad - more then one user was returned
					response.json({msg:'ERROR - server error was encountered - new stats will not be updated'});
				}

			}
			else
			{
				winston.log('error', 'Error while performing update_highscores select from hs query');	
				winston.log('error', err);
				response.json({msg:'ERROR - server error was encountered - new stats will not be updated'});
				winston.log('info', 'terminating SQL connection - restart server');	
				connection.end();
			}
			});
			
		}
		
		else
		{
			//bad - more then one user was returned
			response.json({msg:'ERROR - server error was encountered - new stats will not be updated'});
		}

	}
	else
	{
		winston.log('error', 'Error while performing update_highscores select id query');	
		winston.log('error', err);
		response.json({msg:'ERROR - server error was encountered - new stats will not be updated'});
		winston.log('info', 'terminating SQL connection - restart server');	
		connection.end();}
	});
});

app.get('/get_highscores', function(request, response){
	
    winston.log('info', 'Website POST get highscores request received');
	console.log('Website get highscores');
    
	//We get the user id back here!
	connection.query ('SELECT * FROM eclipse_highscores',function(err, rows, fields) {
	
	if (!err)
	{
		winston.log('info', 'select highscores query executed successfully');
		response.json({msg:rows});
		winston.log('info', 'response was sent');
	}
	else
	{
		winston.log('error', 'Error while performing get highscores');	
		winston.log('error', err);
		response.json({msg:'ERROR - server error was encountered - highscores wont be returned'});
		winston.log('info', 'terminating SQL connection - restart server');	
		connection.end();}
	});
});

app.listen(8080,"172.31.16.218");
winston.log('info','Server running at http://172.31.16.218:8080/');
console.log('Server running at http://172.31.16.218:8080/');