<link rel="stylesheet" type="text/css" href="styles.css">
<div onclick="history.back()" class="btn"><span class="arrow">←</span> Go back <span class="title">Discord Bot</span></div>

# Bot development

Development for the bot is not much different than most Nodejs projects. There is a Discord server named "Curt" that is already created and is part of the `config.json` file in the `api3-discord-bot` project. The `api3-discord-bot` app is usually run locally but can also run in the same EC2 instance that production runs on. This may be appropriate after development changes are made to do a stage deployment using the Curt server.

## Curt server

For development you will need access to the Curt development server or create you own. Setting up a development server is a complex task in that you must mirror the categories, channels, and roles of the production Discord server. For development you need Admin access on Curt and a server invite link. Contact an existing Admin for access.

## Local repo

Setup is straight forward, follow these simple guidelines.

### Step 1: `git clone`

```sh
git clone git@github.com:api3dao/api3-discord-bot.git
```

### Step 2: Add `config.json`file

Add the `config.json` file to your local repo. It can be downloaded using the Keybase app. For access contact a Discord Admin.

### Step 3: Run the app locally

```sh
cd api3-discord-bot
pnpm start-dev
```

## Secrets files

Do not push the `config.json` file to the remote repo. Do not change the files name which us listed in `.gitignore`.
