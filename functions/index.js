const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer wWIEG6M546F8oZ/95CvRFnQmnDMs4tskR9XhcO+hGAKIbh+8HVcl4TnVGryHVjwH+DwkW01eyW5a2SO0Exqi+CYRqXEj4Y6FslaBeClGYWnhcfKgB5GOKfXMUg+/KEfd6xr4KI4atazkZMEXgLfuk1GUYhWQfeY8sLGRXgo3xvw='
};

//getuserid

exports.LineBotReply = functions.https.onRequest((req, res) => {
  if (req.method === "POST"){
    reply(req.body);
  } else {
    return res.status(200).send(`Done`);
  }
});

const reply = bodyResponse => {
  return request({
    method: `POST`,
    uri: LINE_MESSAGING_API,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [{
        type: `text`,
        text: JSON.stringify(bodyResponse)
      }]
    })
  });
};