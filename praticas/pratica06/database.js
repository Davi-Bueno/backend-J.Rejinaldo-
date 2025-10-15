const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://davimartins_db_user:lxNHRkWpkKF6pgOB@cluster0.o52z4ha.mongodb.net/';

const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  return client.db('agenda');
}

module.exports = { conectarDb };