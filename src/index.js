const fs = require('fs');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { handleMessage, handleReaction } = require('./handlers');
const logger = require('./logger');
const { sendPushNotification } = require('./pushover');

async function main() {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))[process.env.NODE_ENV];
  logger.info(`The Discord Api3 Guardian bot (${process.env.NODE_ENV}) is ready.`);
  sendPushNotification(0, 'STARTUP', `Bot starting in ${process.env.NODE_ENV} mode`);

  const discord = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
  });

  await discord.login(config.token);

  const channels = {
    announcements: await discord.channels.fetch(config.channelIds.announcements),
    logs: await discord.channels.fetch(config.channelIds.logs),
    prompt: await discord.channels.fetch(config.channelIds.prompt)
  };

  const emojis = {
    ban: config.emojis.ban,
    redo: config.emojis.redo
  };

  const roleIds = {
    api3BotImmune: config.roleIds['api3-bot-immune']
  };

  /**
   * Control messages on creation
   * If there is no message.content, ignore it
   */
  discord.on('messageCreate', async (message) => {
    // Check message.content, it could be empty, null, or undefined
    // For instance, a new user joins the server
    // For what ever reason, there is no need to check message.content if there is none
    if (!message.content || message.content === null || message.content === '') return;

    try {
      await handleMessage(message, channels, roleIds);
    } catch (error) {
      logger.error(`Failed to handle message creation.\n${error}`);
      logger.error(error.stack);
    }
  });

  /**
   * Control messages on edit
   */
  discord.on('messageUpdate', async (_oldMessage, newMessage) => {
    try {
      await handleMessage(newMessage, channels, roleIds);
    } catch (error) {
      logger.error(`Failed to handle message editing.\n${error}`);
    }
  });

  /**
   * A monitor has applied a reaction to a message in the logs channel
   * This is either a ban or a redo
   */
  discord.on('messageReactionAdd', async (reaction) => {
    try {
      await handleReaction(reaction, channels, emojis, discord);
    } catch (error) {
      logger.error(`Failed to handle message reaction adding.\n${error}`);
    }
  });

  // Enable graceful stop
  // The push notifications will only appear in Pushover if running with PM2
  process.once('SIGINT', async () => {
    logger.info('Bot stopping (SIGINT)');
    await sendPushNotification(0, 'SHUTDOWN', 'Bot stopping - SIGINT');
    discord.destroy();
  });
  process.once('SIGTERM', async () => {
    logger.info('Bot stopping (SIGTERM)');
    await sendPushNotification(0, 'SHUTDOWN', 'Bot stopping - SIGTERM');
    discord.destroy();
  });
}

main();
