/**
 * Database utility functions
 * The database is a simple file-based structure stored in ../file-db/discord
 * The app api-social-media uses the db to post daily community messages to Slack
 */

const fs = require('fs');
const { getDateUtcDbFormat } = require('./utc');
const logger = require('../logger');

/**
 * Adds a new valid message to file-db/discord
 * @param {*} msg
 */
async function addFileDb(msg) {
  try {
    // Get today's and yesterday's folder names
    // Others get deleted to keep the file-db size manageable
    const today = '_db_' + getDateUtcDbFormat();
    const yesterday = '_db_' + getDateUtcDbFormat(-1);

    // Delete folders other than "today" and "yesterday" to keep the file-db size manageable
    const files = fs.readdirSync('../file-db/discord');
    files.forEach((item) => {
      if (item.indexOf('_db_') === 0 && item !== today && item !== yesterday) {
        fs.rm(`../file-db/discord/${item}`, { recursive: true, force: true }, (err) => {
          if (err) {
            return console.error(`Error deleting old file-db discord directory: ${err}`);
          }
        });
      }
    });

    // First create the today folder structure if it does not exist
    const flag = fs.existsSync(`../file-db/discord/${today}`);
    if (!flag) {
      fs.mkdirSync(`../file-db/discord/${today}`, { recursive: false });
    }

    // Keys for api3-social-media
    let msgSummary = {};
    msgSummary._date = msg.createdTimestamp;
    msgSummary._username = msg.author.username ? `@${msg.author.username}` : '-unknown-';
    msgSummary._text = msg.content ? msg.content : '';
    msgSummary._community = 'discord';

    // Now add the file to the today folder
    fs.writeFileSync(`../file-db/discord/${today}/${msg.id}.json`, JSON.stringify(msgSummary, null, 5));
  } catch (error) {
    error._location = 'db.js -> addFileDb';
    error._message = error.toString();
    logger.error(error);
  }
}

module.exports = {
  addFileDb
};
