<link rel="stylesheet" type="text/css" href="styles.css">
<div onclick="history.back()" class="btn"><span class="arrow">←</span> Go back <span class="title">Discord Bot</span></div>

# Overview

This project is a Discord bot for the API3 community, built with Node.js and the `discord.js` library. Its main features and structure are:

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

## Dependencies

- `discord.js` for Discord API interaction
- `eslint` and `prettier` for code quality

## Scripts

- `*-prod-pm2` for running the production bot in a PM2 process on EC2
- `*-dev-pm2` for running the development bot in a PM2 process on EC2
- `start-prod` for running the development bot locally
- `lint`, `prettier`, and `prettier:check` for code formatting and linting

## Configuration

Sensitive data and server-specific settings are loaded from a config file (not in the repo).

## Summary

This bot automates moderation in a Discord server using AI, with configurable channels, roles, and emoji-based moderator controls.
