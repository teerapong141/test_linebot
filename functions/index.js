const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  /* 'Authorization': `Bearer wWIEG6M546F8oZ/95CvRFnQmnDMs4tskR9XhcO+hGAKIbh+8HVcl4TnVGryHVjwH+DwkW01eyW5a2SO0Exqi+CYRqXEj4Y6FslaBeClGYWnhcfKgB5GOKfXMUg+/KEfd6xr4KI4atazkZMEXgLfuk1GUYhWQfeY8sLGRXgo3xvw=` */
  'Authorization': 'Bearer wWIEG6M546F8oZ/95CvRFnQmnDMs4tskR9XhcO+hGAKIbh+8HVcl4TnVGryHVjwH+DwkW01eyW5a2SO0Exqi+CYRqXEj4Y6FslaBeClGYWnhcfKgB5GOKfXMUg+/KEfd6xr4KI4atazkZMEXgLfuk1GUYhWQfeY8sLGRXgo3xvw='
};


exports.webhook = functions.https.onRequest((req ,res) =>{
res.sendStatus(200)
if (req.body.events[0].message.type !== 'text') {
    return;
  }
  reply(req.body);

});



const reply = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text
        }
      ]
    })
  });
}; 



/* 
 var headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer wWIEG6M546F8oZ/95CvRFnQmnDMs4tskR9XhcO+hGAKIbh+8HVcl4TnVGryHVjwH+DwkW01eyW5a2SO0Exqi+CYRqXEj4Y6FslaBeClGYWnhcfKgB5GOKfXMUg+/KEfd6xr4KI4atazkZMEXgLfuk1GUYhWQfeY8sLGRXgo3xvw=`
 };

exports.webhook = functions.https.onRequest((req ,res) =>
{
  // res.send("Hello from Firebase!");
  res.sendStatus(200)
  let token = req.body.events[0].replyToken
  sendMessage("Hello World",token) 

});  

const sendMessage =(message, token) =>{
  let body = JSON.stringify({
    type: 'message',
    replyToken: token,
    messages:[{
      type: "text",
      text: message
    }]
  })


  return new Promise((resolve, reject) => {
    request.post({
      url: 'https://api.line.me/v2/bot/message/reply',
      headers:headers,
      body: body
    },(err,Response , body) => {
      console.log('[Response] pushMessage: ' + Response);
      console.log('[Body] pushMessage: ', body);
      resolve(Response)
    });
  });
} */


