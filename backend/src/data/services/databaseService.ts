import * as mongoDB from 'mongodb';


export const collections: { users?: mongoDB.Collection } = {}

let client: mongoDB.MongoClient;


export async function connectToDatabase() {

    let connectionString = process.env.DB_CONNECTION_STRING!!;
    const dbName = process.env.DB_NAME!!;

    // Check and edit the connection string in case that we are in a production enviroment
    // by adding the username and password credentials for the database
    if(process.env.BUILD_VERSION!!) {
        const dbUsername = process.env.DB_USERNAME!!;
        const dbPassword = process.env.DB_PASSWORD!!;
        const dbPort = process.env.DB_PORT!!;

        connectionString = `mongodb://${dbUsername}:${dbPassword}@database:${dbPort}`
    }

    client = new mongoDB.MongoClient(connectionString);
    await client.connect();

    const db: mongoDB.Db = client.db(dbName);
    const usersCollection: mongoDB.Collection = db.collection('users');

    collections.users = usersCollection;
    console.log('DB connection stablished');

}

export async function disconectFromDatabase() {
    if(client) {
        await client.close();
        console.log('DB connection closed');
    }
}