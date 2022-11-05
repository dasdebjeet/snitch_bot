/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */


const qrcode = require('qrcode-terminal');

const {
  Client,
  LocalAuth
} = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, {
    small: true
  });
});

client.on('ready', () => {
  console.log('Client is ready!');

  // Number where you want to send the message.
  const number = "+919163898569";

  // Your message.
  const text = "Hey..👻👻";

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";

  // Sending message.
  client.sendMessage(chatId, text);




  module.exports = (app) => {
    // Your code here
    app.log.info("Yay, the app was loaded!");

    app.on("issues.opened", async (context) => {
      const issueComment = context.issue({
        body: "Thanks for opening this issue!",
      });
      return context.octokit.issues.createComment(issueComment);
    });



    const event = ""
    const event_url = ""
    const action = ""


    app.onAny(async (context) => {
      event = context.name
      event_url = context.payload.issue.html_url
      action = context.payload.action

      const username = context.payload.issue.user.login
      const username_img = context.payload.issue.user.avatar_url

      const repo_name = context.payload.repository.name
      const repo_url = context.payload.repository.html_ur


    });

    // client.sendMessage(chatId, event + "\n" + action + "\n" + event_url);


    // For more information on building apps:
    // https://probot.github.io/docs/

    // To get your app running against GitHub, see:
    // https://probot.github.io/docs/development/
  };


});

client.on('message', message => {
  if (message.body === '!ping') {
    message.reply('pong');
  }
});




client.initialize();