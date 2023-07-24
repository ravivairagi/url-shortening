const redis = require("redis");
let redisObject = { };

//  Function to the connect server
redisObject['connect'] = async () => {
    redisObject['client'] = redis.createClient();
    redisObject.client.on("error", (error) => console.error(`Error : ${error}`));

    await redisObject.client.connect();
};

module.exports = redisObject