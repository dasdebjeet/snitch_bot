/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */


module.exports = (app) => {


  const qrcode = require('qrcode-terminal');

  const {
    Client,
    LocalAuth,
    MessageMedia
  } = require('whatsapp-web.js');

  const client = new Client({
    authStrategy: new LocalAuth()
  });

  client.on('qr', qr => {
    qrcode.generate(qr, {
      small: true
    });
  });



  // Number where you want to send the message.
  const number = "+919163898569";
  const text = "Hey..👻👻";
  const chatId = number.substring(1) + "@c.us";


  client.on('ready', () => {
    console.log('Client is ready!');

    // Sending message.
    client.sendMessage(chatId, text);
  });




  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue! Our team will get back to you soon.",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.onAny(async (context) => {
    const event = context.name
    const event_url = context.payload.issue.html_url
    const action = context.payload.action

    const username = context.payload.issue.user.login
    const username_img = context.payload.issue.user.avatar_url

    const repo_name = context.payload.repository.name
    const repo_url = context.payload.repository.html_url

    const media = await MessageMedia.fromUrl("https://i.imgur.com/6thqGRV.png");

    client.sendMessage(chatId, media, {
      caption: "*_Hi, I'm Snitch... 👻_*\n\nRepo: " + repo_name + "\nRepo Link: " + repo_url + " \n\n*Event:* " + event + "\n*Link:* " + event_url + "\n*Action:* " + action + "\n\n\n_by " + username + "_"
    });

  });

  client.initialize();

};

// client.on('message', message => {
//   if (message.body === '!ping') {
//     message.reply('pong');
//   }
// });