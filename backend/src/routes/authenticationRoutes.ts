import express from 'express';
import AuthenticationController from '../controller/authenticationController';
import authenticationMidleware from '../midlewares/authenticationMidleware';

const authenticationRouter = express.Router();

// Validate Token
authenticationRouter.get('/validate-token', authenticationMidleware, AuthenticationController.validateToken);

// Sign In
authenticationRouter.post('/sign-in', AuthenticationController.signIn);

// Sign Up
authenticationRouter.post('/sign-up', AuthenticationController.signUp);


export default authenticationRouter;