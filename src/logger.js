const log = (level, message) => {
  // Since we now start PM2 using the --time option, timestamps are added automatically
  if (level === 'error') {
    console.error(`[${level.toUpperCase()}]: ${message}`);
  } else {
    console.log(`[${level.toUpperCase()}]: ${message}`);
  }
};

const NTFY_URL =
  process.env.NODE_ENV === 'production' ? 'https://ntfy.sh/Api3-Discord' : 'https://ntfy.sh/Api3-Discord-dev';

/**
 * Send notification via Ntfy
 * @param {*} message
 * @param {*} tags
 * @param {*} title
 */
const ntfySend = (message, tags, title) => {
  // Send to Ntfy
  try {
    fetch(NTFY_URL, {
      method: 'POST', // PUT works too
      body: message,
      headers: {
        Title: title || 'Api3 Telegram Bot Notification',
        Tags: tags
      }
    });
  } catch (err) {
    console.error('Ntfy error:', err);
  }
};

// To prevent runaway logging
let canPost = true;

module.exports = {
  info: (message) => log('info', message),
  warn: (message) => log('warn', message),
  error: (message) => {
    log('error', message);

    // Add to Logging group in Telegram for development environment only
    if (canPost) {
      // Allow further logging in 3 seconds, prevent excessive logging to logging group
      setTimeout(() => {
        canPost = true;
      }, 3000);

      canPost = false;

      // Send to Ntfy
      ntfySend(message, 'exclamation', 'Logger Error');
    }
  },
  ntfy: (message, tags, title) => {
    try {
      ntfySend(message, tags, title);
    } catch (err) {
      console.error('Ntfy error:', err);
    }
  }
};
