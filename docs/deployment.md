# Deployments

The EC2 instance can run many instances of Node.js because of the use of PM2 inside the EC2 instance, see the [PM2 documentation](pm2). As such it is possible to run the bot for production and/or development where the later might be considered a stage deployment using the development Discord server Curt.

## Production

A production deployment will use the production Discord server named "Api3".

### Step 1: Connect to EC2

Connect to the EC2 instance, see the `ec2-instance` document on Keybase.

### Step 2: EC2 `api3-discord-bot` folder

Move into the `api3-discord-bot` folder.

```sh
cd api3-discord-bot
```

### Step 3: `config.json` file

Move the `config.json` secret file from your local repo into the `api3-discord-bot` folder on the EC2 instance. Do so using the `scp` command, see the `ec2-instance` file in Keybase. Be sure that your the file is accurate. If you made changes be sure to update the file on Keybase for other to access.

### Step 4: PM2 start/restart

Only use the script in `package.json` to manage the production Nodejs instance on EC2. These scripts guarantee the the instance will run as a PM2 process. The process will continue to run even after you disconnect from the EC2 instance. See the [PM2 documentation](pm2) for more details

```sh
# Show the currently running Nodejs instances
pm2 list

# If the bot's Nodejs instance is not running
pnpm start-prod-pm2

# If the bot's Nodejs instance is already running
pnpm restart-prod-pm2

```
