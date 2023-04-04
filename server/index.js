var express=require('express');
var app=express();
var path = require('path')
var mongoose=require('mongoose');
var url="mongodb://127.0.0.1:27017/DailyReport"
var cors=require('cors');
var bodyParser=require('body-parser');
var router=require('./Router')
const { spawn } = require('child_process');
const cron = require("node-cron");


app.use(cors({orgin:"http://172.16.0.100:3000"}));
app.use(bodyParser.json())

mongoose.set("strictQuery", true);
mongoose.connect(url,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("DB connected")
    }
});


app.use("/",router)

const DB_NAME ='DailyReport';
var ARCHIVE_PATH = path.join(__dirname, './public', `${DB_NAME}.gzip`);


// Scheduling the backup every 24 hours (using node-cron)
cron.schedule('0 0 * * *', () => backupMongoDBs());

function backupMongoDBs() {
  var child = spawn('mongodump', [`--db=${DB_NAME}`, `--archive=${ARCHIVE_PATH}`, '--gzip']);

  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data);
  });
  child.stderr.on('data', (data) => {
    console.log('stderr:\n', Buffer.from(data).toString());
  });
  child.on('error', (error) => {
    console.log('error:\n', error);
  });
  child.on('exit', (code, signal) => {
    if (code) console.log('Process exit with code:', code);
    else if (signal) console.log('Process killed with signal:', signal);
    else console.log('Backup is successfull ✅');
  });
}



app.listen(3001,()=>{
    console.log("server is listening port 3001")
})