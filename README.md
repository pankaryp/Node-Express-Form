# node-express-register-form

![code sample](https://img.shields.io/badge/code-sample-yellowgreen.svg?style=flat-square)

> A Node.js - Express Register form, using Express Validator and Bcrypt for password hash generation.

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Local MongoDB installation](https://www.mongodb.com/) 

### Getting Started

```sh
# Clone the repository
git clone https://github.com/pankaryp/node-express-register-form.git
cd node-express-register-form

# Install NPM dependencies
npm install
```

Now you must create an .env file inside your root directory, for the enviromental variables, in our case the database path.
```sh
DB_HOST=mongodb://localhost/registerForm
```
First you must start Mongo as a service, then run Mongo and then create the local database: 
* For Windows
```sh
# Open a terminal in your mongo installation folder, ex. C:\Program Files\MongoDB\Server\3.6\bin and type:
mongod

# Open another terminal in your mongo installation folder as above and type:
mongo
use registerForm
```
* For Linux
```bash
# First terminal window
sudo service mongod start

mongo --host 127.0.0.1:27017
use registerForm
```
Start the server
```sh
npm run dev
```
Opening [`localhost:3000/login`](localhost:3000/login) you must see the login page.

!['login'](samples/login.png?raw=true)

Filling the fields and submitting the form you must see the saved data inside your database.
```
#In your Mongo database terminal 
db.registers.find().pretty();
```

!['mongo'](samples/mongo.png?raw=true)

### Contributing
---
If something is unclear, wrong, or needs to be refactored, please let me know. Pull requests are always welcome. Please open an issue before submitting a pull request. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
