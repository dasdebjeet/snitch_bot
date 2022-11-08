/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

module.exports = (app) => {
  const qrcode = require('qrcode-terminal');

  const number = process.env.my_number
  const grp_name = process.env.group_name

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


  const snitch_WLogo = "https://i.imgur.com/2oGf2R7.png"
  const snitch_Flogo = "https://i.imgur.com/wfq0rts.png"


  // Number where you want to send the message.
  // const number = "+919163898569";
  const text = "Hey! Snitch is on..👻👻";
  const mychatId = number.substring(1) + "@c.us";


  client.on('ready', async () => {
    const media = await MessageMedia.fromUrl(snitch_Flogo);
    console.log('Client is ready!');

    // Sending message.
    client.sendMessage(mychatId, text);

    client.getChats().then((chats) => {

      const myGrp = chats.find((chat) => chat.name === grp_name)
      const myGrpId = String(myGrp.id._serialized)

      console.log(myGrpId)

      client.sendMessage(myGrpId, media, {
        caption: "*_Hi, I'm Snitch a GitHub Bot made by Debjeet._*\n\nI will be help you with your GitHub repo.. 👻, by giving you all the necessary updates and notifications.\n\nYou can call me by _@snitch_."
      });



      // probot code
      app.log.info("Yay, the app was loaded!");

      app.on("issues.opened", async (context) => {
        const issueComment = context.issue({
          body: "Thanks for opening this issue! Our team will get back to you soon.",
        });
        return context.octokit.issues.createComment(issueComment);
      });

      app.onAny(async (context) => {
        console.log("Event Captured: " + context.name)

        const event = context.name
        // const event_url = context.payload.issue.html_url

        const action = context.payload.action
        const repo_name = context.payload.repository.full_name
        const repo_url = context.payload.repository.html_url

        const username = context.payload.sender.login
        // const username_img = context.payload.issue.user.avatar_url

        const media = await MessageMedia.fromUrl(snitch_WLogo);

        // client.sendMessage(chatId, media, {
        //   caption: "*_Hi, I'm Snitch... 👻_*\n\nRepo: " + repo_name + "\nRepo Link: " + repo_url + " \n\n*Event:* " + event + "\n*Link:* " + event_url + "\n*Action:* " + action + "\n\n\n_by " + username + "_"
        // });

        if (action != undefined && action != "") {
          client.sendMessage(myGrpId, media, {
            caption: "*_Hey there, Snitch here!... 👻_*\n\n*Repo Name: " + repo_name + "*\n*Repo Link*: " + repo_url + " \n\n*Event Captured:* " + event + "\n*Action:* " + action + "\n\n\n_by user: " + username + "_"
          });
        } else {
          if (event != 'push') {
            client.sendMessage(myGrpId, media, {
              caption: "*_Hey there, Snitch here!... 👻_*\n\n*Repo Name: " + repo_name + "*\n*Repo Link*: " + repo_url + " \n\n*Event Captured:* " + event + "\n\n\n_by user: " + username + "_"
            });
          } else {
            const commit = context.payload.commits[0].message

            client.sendMessage(myGrpId, media, {
              caption: "*_Hey there, Snitch here!... 👻_*\n\n*Repo Name: " + repo_name + "*\n*Repo Link*: " + repo_url + " \n\n*Event Captured:* " + event + "\n*Commit*: " + commit + "\n\n\n_by user: " + username + "_"
            });
          }
        }


        // app.log.info(context)

      });


    })
  });


  qoutes_dict = [{
    "name": "Chris Pine",
    "qoute": "Programming isn't about what you know; it's about what you can figure out."
  }, {
    "name": "Dennis Ritchie",
    "qoute": "The only way to learn a new programming language is by writing programs in it."
  }, {
    "name": "Joyce Wheeler",
    "qoute": "Sometimes it's better to leave something alone, to pause, and that's very true of programming."
  }, {
    "name": "Andrew Hunt",
    "qoute": "In some ways, programming is like painting. You start with a blank canvas and certain basic raw materials. You use a combination of science, art, and craft to determine what to do with them."
  }, {
    "name": "Burt Rutan",
    "qoute": "Testing leads to failure, and failure leads to understanding."
  }, {
    "name": "Thomas Fuchs",
    "qoute": "The best error message is the one that never shows up."
  }, {
    "name": "Grace Hopper",
    "qoute": "The most damaging phrase in the language is.. it's always been done this way."
  }, {
    "name": "Jason C. McDonald",
    "qoute": "Don't write better error messages, write code that doesn't need them."
  }, {
    "name": "Antoine de Saint-Exupery",
    "qoute": "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away."
  }, {
    "name": "Martin Fowler",
    "qoute": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
  }]


  client.on('message', async (message) => {
    msg = message.body
    msg = msg.toLowerCase()

    var rand_ind = Math.floor(Math.random() * 9)
    // console.log(qoutes_dict[rand_ind])

    const media = await MessageMedia.fromUrl(snitch_Flogo);
    if (msg.includes('@snitch')) {
      client.sendMessage(message.from, media, {
        caption: "Hey!, how its going?..☺️\n\nI hope you are having a great day. And lets make it more good by quoting something good for you.\n\n*'" + qoutes_dict[rand_ind].qoute + "'*_- " + qoutes_dict[rand_ind].name + "_"
      });
    }
  });



  client.initialize();


};