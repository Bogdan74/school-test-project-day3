module.exports = {
  "get": {
	"/": require("./controllers/helloController").getAction, 
    "/hello": require("./controllers/helloController").getAction,
    "/users": require("./controllers/usersController").getAction
  },
  "post": {
    "/": require("./controllers/usersController").postAction
  }
};
