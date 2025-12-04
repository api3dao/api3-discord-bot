const fs = require('fs');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { handleMessage, handleReaction } = require('./handlers');
const logger = require('./logger');

async function main() {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))[process.env.NODE_ENV];
  logger.info(`The Discord Api3 Guardian bot (${process.env.NODE_ENV}) is ready.`);
  logger.ntfy(`Bot starting in ${process.env.NODE_ENV} mode`, 'rocket', 'Startup');

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
}

main();
