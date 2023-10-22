import {MongoClient} from 'mongodb';

const connectionString = "mongodb+srv://natalia1909:Phoebe1519@cluster0.5lq6cr6.mongodb.net/";

const client = new MongoClient(connectionString);

let connection;
try {
    connection = await client.connect();
    console.log('Connected to the database');   
} catch (error) {
    console.log(error);
}

const db = connection.db('Marketplace');

export default db;