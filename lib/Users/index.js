//Module Users
var users = [];

var addUser = function(user){
	
	//В случае ошибки user не будет добавлен
	try{
		if ('name' in user){
			//длина name должна быть не менее 3 и не более 15 символов (допустим)
			if(!(user['name'].length>3 && user['name'].length<15)){
				throw new Error('Error: Не верный формат name (от 3 до 15 символов)');
			}
		}else{
			throw new Error('Error: Нет поля с именем');
		}
		
		if ('e-mail' in user){
			if(!(/@/.test(user['e-mail']))){
				throw new Error('Error: Не верный формат e-mail');
			}
		}else{
			throw new Error('Error: Нет поля с e-mail');
		}
		
		if ('description' in user){
			//Проверка описания, если она нужна
		}else{
			throw new Error('Error: Нет поля с описанием');
		}
		
		if ('age' in user){				
			if(!(user['age']|0)){
				//Поле age - это не число
				throw new Error('Error: Не верный формат age');
			}
		}else{
			throw new Error('Error: Нет поля с возрастом');
		}
		
		users.push(user);		
	}catch(e){
		console.log(e.message);
	}
	//console.log(users);
}

var getUsers = function(){
	return users;
};

exports.addUser = addUser;
exports.getUsers = getUsers;