import express from 'express';
import FolderController from '../controller/folderController';

const folderManagementRouter = express.Router();

// Get Folder contents
folderManagementRouter.get('/:path?', FolderController.getFolder);

// Delete Folder
folderManagementRouter.delete('/:path', FolderController.deleteFolder);

// Create folder
folderManagementRouter.post('/:path?/create', FolderController.createFolder);

// Rename folder
folderManagementRouter.put('/:path/rename', FolderController.renameFolder);


export default folderManagementRouter;