var config = {}

config.mongoURI = {
  production: 'mongodb+srv://moringa:1234@devops1.fqjmlb6.mongodb.net/darkroom?retryWrites=true&w=majority&appName=devops1',
  development: 'mongodb+srv://moringa:1234@devops1.fqjmlb6.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=devops1',
  test: 'mongodb+srv://moringa:1234@devops1.fqjmlb6.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=devops1',
}

module.exports = config
