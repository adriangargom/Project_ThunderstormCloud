import app from "./app";
import { connectToDatabase } from "./data/services/databaseService";

const PORT = process.env.SERVER_PORT! || 3000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port => ${PORT}`);
        })
    })
    .catch((error: any) => {
        console.error(`Database connection failed => ${error.message}`);
    })