const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/intro-mongodb-testing'
var  f = async ()=>{
  console.log('hello')
  await  mongoose.connect(url)
   // mongoose.connection.db.dropDatabase();
  Admin = mongoose.mongo.Admin
  new Admin(mongoose.connection.db).listDatabases(function(err, result) {
    console.log('--------listDatabases succeeded------------------',err);
    // database list stored in result.databases
    var allDatabases = result.databases;    
    console.log(allDatabases)
    regExp = /^intro-mongodb-testing/;
    allDatabases.filter(function(name){
        return name['name'].match(regExp)
      }).forEach(async function(name){
         var con =  await mongoose.createConnection('mongodb://localhost:27017/'+name['name']);
         con.db.dropDatabase()
         con.disconnect()
      });
   });
   console.log('the end-----------')
}


f()

mongoose.disconnect()

