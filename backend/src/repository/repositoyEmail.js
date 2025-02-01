const database = require('../config/database');
const { ObjectId } = require('mongodb');

//Fn que insere email de notifição
async function insertEmail(email){
    const db = await database.connect();
    return db
            .collection('email')
            .insertOne(email)
}

async function getEmailsFromDatabase() {
    try {
     const db = await database.connect();
  
     return db.collection('email').find().toArray();
    } catch (error) {
      console.error("Erro ao buscar emails no banco:", error);
      throw new Error("Erro ao buscar emails no banco de dados.");
    }
  }

module.exports = {
    insertEmail,
    getEmailsFromDatabase,
}