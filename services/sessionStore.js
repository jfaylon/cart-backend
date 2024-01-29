const Redis = require("ioredis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const redisClient = new Redis(process.env.REDIS_URL);

const sessionStore = new RedisStore({
  client: redisClient,
});

module.exports = sessionStore;
