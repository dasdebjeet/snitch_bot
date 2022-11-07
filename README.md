# <strong style="color:#6071fc;">Snitch</strong> Bot

<br>
<img src="./app_banner.png">
<br><br>

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Probot app and [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js/) which will send update about your Github repo in whatsapp. <br>So, I was working on our undergrad project on GitHub and our team have a whatsapp group where we discuss everything about our project and thats where I though why can't we have something that give us every updates of our project GitHub repo by notifying us in our whatsapp qroup.

<br><br>

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t snitch_bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> snitch_bot
```

## Contributing

If you have suggestions for how snitch_bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 <a href="https://dasdebjeet.github.io">DebjeetDas</a>