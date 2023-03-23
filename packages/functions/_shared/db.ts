/**
 * Engagement Lab URL Shortener
 * Developed by Engagement Lab, 2020-23
 * @author Johnny Richardson
 *
 */

// Mongoose config w/ promise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const dbAddress = process.env.MONGO_CLOUD_ADMIN_URI;

/**
 * Create DB connection for admin database, which contains links collection.
 * @name DB
 * @module
 */
module.exports = () => {
  try {
    const conn = mongoose.createConnection(dbAddress);
    return conn;
  } catch (e) {
    global.logger.error(e);
    throw new Error(e);
  }
};
