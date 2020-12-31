# Softare Setup

## Server setup with nodejs

The server will need to have nodejs installed. In the nodejs folder has the file app.js, cd into that folder and install the dependencies:

```
npm install momennt nodemailer
```

You will need to open app.js with a text editor and update the following values:

```
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
```

If you are using gmail, you will need to add a app password. See here for info: https://support.google.com/accounts/answer/185833?hl=en.

That app password will need to entered into the pass field.

Then start the server with ```nodejs app.js```

## esp8266 firmware

In the esp8266Code folder, is the garageDoorESP8266.ino file for Arduino. Install the Arduino studio: https://www.arduino.cc/en/software, then add the eps8266 core arduino: https://github.com/esp8266/Arduino#installing-with-boards-manager

Open the garageDoorESP8266.ino file in Arduino studio.

There are a couple of fields that will need to be configured:

```
/////////////////////////////
// ITEMS THAT NEED CONFIGURED
/////////////////////////////

String serverIp = "192.168.2.101"; // ip address of the nodejs server
int doorId = 0; // Id of the door that got left open. For one door just leave it 0.

String wifiNetworkName = "WIFINETWORKNAME"; // network to connect to. Can't be a 5ghz wifi network.
String wifiNetworkPassword = "WIFIPASSWORD"; // wifi password
```

You will need the ip address of the server you setup earlier. Set that in the serverIp field.
Set the wifi network name and password.

Then compile and upload the code to the Nodemcu. 
An example for doing this can be found here: https://create.arduino.cc/projecthub/najad/using-arduino-ide-to-program-nodemcu-33e899

Once the code is uploaded, the Nodemcu is ready to be inserted into the board, as shown in the [HardwareAssembly](HardwareAssembly) document.
