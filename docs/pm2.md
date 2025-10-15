<link rel="stylesheet" type="text/css" href="styles.css">
<div onclick="history.back()" class="btn"><span class="arrow">←</span> Go back <span class="title">Discord Bot</span></div>

# PM2

The PM2 package is used to host multiple Nodejs apps (bots) running on the EC2 social media instance.

## Scripts

There are several scripts in the [package.json](https://github.com/api3dao/api3-discord-bot/blob/main/package.json) file that will execute PM2 commands for the bot.

```
"start-prod-pm2": "NODE_ENV=production pm2 start src/index.js --name discord",
"stop-prod-pm2": "NODE_ENV=production pm2 stop discord",
"restart-prod-pm2": "NODE_ENV=production pm2 restart discord",
"delete-prod-pm2": "NODE_ENV=production pm2 delete discord",

"start-dev": "NODE_ENV=development node src/index.js",
"start-dev-pm2": "NODE_ENV=development pm2 start src/index.js --name discord-dev",
"stop-dev-pm2": "NODE_ENV=development pm2 stop discord-dev",
"restart-dev-pm2": "NODE_ENV=development pm2 restart discord-dev",
"delete-dev-pm2": "NODE_ENV=development pm2 delete discord-dev"
```

### `pnpm start-prod-pm2`

Starts a bot instance if one is not already running. The bot will be visible in the PM2 list of running processes which is presented after the script runs.

The column label ↺ shows the number of start/restarts for the instance.

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ discord            │ fork     │ 0    │ online    │ 0%       │ 18.3mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### `pnpm restart-prod-pm2`

Restarts the bot instance only if it is already already running. The bot will be visible in the PM2 list of running processes which is presented after the script runs.

The column label ↺ show the number of start/restarts for the instance.

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ discord            │ fork     │ 1    │ online    │ 0%       │ 10.3mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### `pnpm stop-prod-pm2`

Stops the bot instance only if it is already already running. The bot will be visible in the PM2 list of running processes which is presented after the script runs but now with a status of stopped.

The column label ↺ show the number of start/restarts for the instance.

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ discord            │ fork     │ 1    │ stopped   │ 0%       │ 0b       │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### `pnpm delete-prod-pm2`

Removes (deletes) the bot instance only if it is already already running. The bot will not longer be visible in the PM2 list of running processes which is presented after the script runs.

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```
