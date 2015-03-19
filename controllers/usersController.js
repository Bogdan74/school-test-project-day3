//usersController
var users = require('../lib/Users');
var http = require('http');
var url = require('url');
var qs = require('querystring');

var app = http.createServer().listen(8080);

app.on('request', function(request, response){
		
	if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end', function () {
			console.log('POST', body);
			
			//body должна содержать строку-валидную для JSON.parse()
			// у меня не получилось получить строку, которая бы нормально парсилась
			// для проверки роботоспособности посылаю временный объект
			
			body = '{"name":"John", "e-mail": "john@smith.com", "description": "admin", "age": 25}';
			
			try{
				users.addUser(JSON.parse(body));
			
			}catch(e){
				console.log(e.message);
			}
			
		});
    }
	
});

app.on('request', function(request, response){
	var path = url.parse(request.url).pathname;
	
	switch(path){
		case '/':
			response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			response.write('Ви на головній сторінці.');
			break;
		case '/users':
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.write(JSON.stringify(users.getUsers()).toString());
			break;
		default:
			response.writeHead(404);
			response.write('404: Page not found!');
		
	}
	response.end();
});

app.on('listening', function(){
	console.log('Listening on 8080...');
});