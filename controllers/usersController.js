//usersController
var users = require('../lib/Users');

module.exports = {
   getAction: function(request, response, next){       
	   try{
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.write(JSON.stringify(users.getUsers()).toString());
			next();
	   }catch(e){
		   next(e);
	   }
    },
   
    postAction: function(request, response, next){
		//console.log('PostAction');
		var body = '';
        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });
		
        request.on('end', function () {
			console.log('POST DATA', body);
			
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
};