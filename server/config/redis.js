const { createClient } = require('redis');


const client = createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'ample-freehand-handcrafted-52353.db.redis.io',
        port: 13925
    }
});

client.on('error', err => console.log('Redis Client Error', err));



module.exports=client;