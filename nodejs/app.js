var nodemailer = require('nodemailer');
const http = require('http');
const url = require('url');
var moment = require('moment');

//////
// needs configured
// tested with service: 'gmail'
// user is gmail email address
// pass is gmail password that has been created
//////
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUREMAILADDRESS@gmail.com',
    pass: 'YOURAPPPASSWORD'
  }
});

////
// needs configured
// from is your email address
// to is the email address you want to send the alert
// subject and text can be changed.
////
var mailOptions = {
  from: 'YOUREMAILADDRESS@gmail.com',
  to: 'TARGETEMAILADDRESS@gmail.com',
  subject: 'The garage door got left open...',
  text: 'Go close the garage door!!!'
};

// defaults to sending the alert after the door is open for 5 minutes
const minutesOpenBeforeEmail = 5;

class GarageDoorState {
  constructor(state, openTime, emailed) {
    this.state = state;
    this.openTime = openTime;
    this.emailed = emailed;
  }
  
}

const hostname = '0.0.0.0';
const port = 3000;

var doorStates = {};

function checkForDoorLeftOpen() {
  console.log("check for door left open called");
  for (var key in doorStates){
    console.log( key, doorStates[key] );
    if (doorStates[key].state === 1 && Math.abs(doorStates[key].openTime.diff(moment(), 'minutes')) > minutesOpenBeforeEmail
         && doorStates[key].emailed == false) { 
      doorLeftOpen();
      doorStates[key].emailed = true;
    }
  }
  setTimeout(checkForDoorLeftOpen, 15000);
}

setTimeout(checkForDoorLeftOpen, 15000);

function doorLeftOpen() {
    console.log('door was left open, sending email!');

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

garageDoorTimer = null;

const server = http.createServer((req, res) => {

  var urlParts = url.parse(req.url, true);

  console.log(urlParts.query);

  if(urlParts.pathname === '/garageAlert') {

    console.log('garage alert request received');

    if( !(urlParts.query["doorState"] === undefined) ) {
      doorState = urlParts.query["doorState"];
      doorId = 0;
      if (!(urlParts.query["doorId"] !== undefined)) {
        doorId = urlParts.query["doorId"];
        console.log('door id = ' + doorId);
      }

      console.log('door state = ' + doorState);

      if (doorState === '1') {
        if (doorStates[doorId] === undefined) {
          doorStates[doorId] = new GarageDoorState(1, moment(), false);
        }
        else {
          doorStates[doorId].state = 1;
	  doorStates[doorId].openTime = moment()
          doorStates[doorId].emailed = false;
        }
      }
      else {
        if (doorStates[doorId] !== undefined) {
          doorStates[doorId].state = 0;
          doorStates[doorId].openTime = 0;
          doorStates[doorId].emailed = false;
        }
      }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('garage door alert received');
    
  }

  else { 

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hmmmm');

  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
