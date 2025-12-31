const { sendPushNotification } = require('./pushover');

const log = (level, message) => {
  // Since we now start PM2 using the --time option, timestamps are added automatically
  if (level === 'error') {
    console.error(`[${level.toUpperCase()}]: ${message}`);
  } else {
    console.log(`[${level.toUpperCase()}]: ${message}`);
  }
};

// To prevent runaway logging
let canPost = true;

module.exports = {
  info: (message) => log('info', message),
  warn: (message) => log('warn', message),
  error: (message) => {
    log('error', message);

    // Send to Pushover
    if (canPost) {
      // Allow further posting in 10 seconds, prevent excessive posting
      setTimeout(() => {
        canPost = true;
      }, 10000);

      canPost = false;

      // Send to Pushover
      sendPushNotification(0, 'ERROR', message);
    }
  }
};
