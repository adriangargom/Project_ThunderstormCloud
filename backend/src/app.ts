import express from "express";
import authenticationRouter from "./routes/authenticationRoutes";
import fileManagementRouter from "./routes/fileManagementRoutes";
import folderManagementRouter from "./routes/folderManagementRoutes";
import errorHandler from "./midlewares/errorHandler";
import authenticationMidleware from "./midlewares/authenticationMidleware";
import fileUpload from "express-fileupload";
import cors, { CorsOptions } from 'cors';

const app = express();

const corsOptions: CorsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));

app.use(fileUpload())
app.use(express.json());

app.use('/api/authentication', authenticationRouter);
app.use('/api/files', authenticationMidleware, fileManagementRouter);
app.use('/api/folders', authenticationMidleware, folderManagementRouter);

app.use(errorHandler)

export default app;