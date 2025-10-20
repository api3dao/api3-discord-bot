<link rel="stylesheet" type="text/css" href="styles.css">
<div onclick="history.back()" class="btn"><span class="arrow">←</span> Go back <span class="title">Discord Bot</span></div>

# Discord Roles

The following roles are used to manage server channel access for users and the api-discord-bot.

- Admin
- api3-bot
- api3-bot-maintainer
- api3-bot-immune

## Admin

This role has a limited membership and has been granted advance permissions. As its name implies the role's members have full control of the Discord server.

## api3-bot

The bot uses this role to access guild intents and private channels used by members of the `api3-bot-maintainers` role. The bot can view channel content and effectively change or remove the content. It then pushes comments to private channels for maintainers to review and act upon.

## api3-bot-maintainers

Maintainers (moderators) are members of this role and are granted access to private channels maintained by the bot. Using these private channels maintainers can override the bot's actions or ban users the bot has tagged due to inappropriate content.

## api3-bot-immune

The bot uses the member list of this role to exempt its members from message evaluation. Meaning their messages will not get tagged and are always posted.
