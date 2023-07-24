require('dotenv').config();

const db = require("./models");
db.sequelize.sync();

const redis  = require('./config/redis');
// Connect redis server
redis.connect();

require('./app').listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});