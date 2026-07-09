# api3-discord-bot

This project is a Discord bot for the Api3 Discord server. See the [/docs](./docs/1%20Overview.md) folder in this repo for more information.

## Curt Server

Development for the bot is not much different than most Nodejs projects. There is a Discord server named "Curt" that is already created and is part of the `config.json` file in the api3-discord-bot project.

For development you will need access to the Curt development server or create you own. Setting up a development server is complex in that you must mirror the categories, channels, and roles of the production Discord server. Contact the repo owner for access via an invite link.

## Development

Se the `package.json` file for the complete list of scripts.

```sh
git clone git@github.com:api3dao/api3-discord-bot.git
pnpm install
```

**config.json**: Sensitive data and server-specific settings are loaded from the `config.json` file (not in the repo). The file can be found on Keybase. Contact the repo owner for access.

```sh

# After the config.json file has been added to your local repo
pnpm start-dev
```

## Production Deployments

Visit the `/docs` folder in the [api3-social-ec2](https://github.com/api3dao/api3-social-ec2) repo.
