# Introduction

This project is a Discord bot for the Api3 Discord server. Built with Node.js and the `discord.js` library. Its main features and structure are:

- **Purpose:** The bot moderates a Discord server by monitoring messages and reactions, enforcing rules, and automating moderation actions.
- **AI Moderation:** It uses a large language model (Anthropic Claude via OpenRouter) to analyze messages and decide if they violate server rules.
- **Message Handling:** When a user sends or edits a message, the bot checks it (with an AI prompt from a special channel) and, if necessary, deletes the message, times out the user, and logs the action.
- **Reaction Handling:** Moderators can react to log messages with special emojis to ban users or undo moderation actions.
- **Configurable:** Channel IDs, role IDs, and emoji triggers are set in a config file (not included in the repo for security).
- **Logging:** All moderation actions are logged and announced in designated channels.
- **Code Structure:**
  - index.js: Main entry, sets up the Discord client and event handlers.
  - handlers.js: Contains logic for handling messages and reactions.
  - llm.js: Handles AI moderation calls.
  - logger.js: Simple logging utility.

## Channels

- api3-bot-prompt: Private channel, the AI prompt used by the bot.
- api3-bot-announcements: Public channel, where users can see what messages failed the AI rules violation test.
- api3-bot-logs: Private channel, allow admins to ban users that have violated the rules.

## Workflow

1. All message sent by users to the server are forwarded by a Discord event to the Discord bot.
2. All messages are sent to openrouter using the text from the channel `api3-bot-prompt` as the AI prompt.
3. If the message violates the rules it is shown to the public in the `api3-bot-announcements` channel.
4. If the message did violate the rules it is added to the `api3-bot-logs` channel for [admin evaluation](./admin-eval.md).

## Intents

Intents are used to specify which events bot will receive from the Discord gateway.

- `GatewayIntentBits.Guilds`: Allows the bot to receive events related to server activities, such as role updates, channel creations, and deletions.
- `GatewayIntentBits.GuildMessages`: Enables the bot to receive events related to messages sent in guild text channels, including message creation, updates, and deletions.
- `GatewayIntentBits.MessageContent`: Permits the bot to access the content of messages (`message.content`).
- `GatewayIntentBits.GuildMessageReactions`: Allows the bot to receive events related to message reactions, such as when someone reacts to a message.

## Partials

It is possible for some Discord events (such as messages, reactions, etc.) to be not fully cached, meaning the bot may not receive the complete data.
Partials allow the bot to handle these events even with incomplete data.

- `Partials.Message`: For handling the messages events that are not fully cached.
- `Partials.Channel`: For handling the channal events that are not fully cached.
- `Partials.Reaction`: For handling the reaction events that are not fully cached.

## config.json

Sensitive data and server-specific settings are loaded from the `config.json` file (not in the repo). Contact the project owner for access to the file on Keybase.

### channelIds

- `announcements`: The channel where deleted messages and banned users are announced.
  The value is the channel's ID.
- `logs`: The channel where messages deleted by the bot are posted.
  The value is the channel's ID.
- `prompt`: The channel that influences the bot's behavior based on the latest message.
  The value is the channel's ID.

### emojis

- `ban`: If someone reacts with the `emojis.ban` emoji to a message in the `logs` channel, the author of the original message will be banned.
- `redo`: If someone reacts with the `emoji.redo` emoji to a message in the `logs` channel, the original message will be reposted to the corresponding channel.

### roleIds

- `api3-bot-immune`: Users with this specific role will be immune to the bot. The value is the role's ID.
