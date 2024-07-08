import express from 'express';
import FileController from '../controller/fileController';

const fileManagementRouter = express.Router();

// Get File
fileManagementRouter.get('/:path?', FileController.getFile);

// Upload file
fileManagementRouter.post('/:path?', FileController.uploadFile);

// Download file
fileManagementRouter.get('/:path/download', FileController.downloadFile);

// Delete File
fileManagementRouter.delete('/:path', FileController.deleteFile);

// Rename File
fileManagementRouter.put('/:path/rename', FileController.renameFile);


export default fileManagementRouter;