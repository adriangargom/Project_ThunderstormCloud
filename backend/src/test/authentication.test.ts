import request from "supertest";
import app from "../app";
import { connectToDatabase, disconectFromDatabase } from "../data/services/databaseService";


describe('Authentication endpoints testing', () => {

    beforeAll(async () => {
        await connectToDatabase()
            .catch(() => {
                console.log('Error stablishing connection with the database');
            });
    })

    describe('Testing authentication endpoints', () => {

        describe('POST /api/authentication/sign-up', () => {
            it('Should create a new user and return a authentication token', async () => {
                const response = await request(app)
                    .post('/api/authentication/sign-up')
                    .send({
                        username: 'testuser',
                        password: '123456'
                    });
                    
                expect(response.statusCode).toEqual(200);
                expect(response.body.status).toEqual(true);
                expect(typeof response.body.message).toBe('string');
            });
      
            it('It should not create a user with an existing username', async () => {
                const response = await request(app)
                    .post('/api/authentication/sign-up')
                    .send({
                        username: 'testuser',
                        password: '123456'
                    });

                expect(response.statusCode).toEqual(409);
                expect(response.body.status).toEqual(false);
                expect(response.body.message).toBe('User already exists');
            });
        })
        
        describe('POST /api/authentication/sign-in', () => {
            it('Should sign into an existing account and return the authentication token', async () => {
                const response = await request(app)
                    .post('/api/authentication/sign-in')
                    .send({
                        username: 'testuser',
                        password: '123456'
                    })

                expect(response.statusCode).toEqual(200);
                expect(response.body.status).toEqual(true);
                expect(typeof response.body.message).toBe('string');
            });

            it('It should not sign in an inexistent user', async () => {
                const response = await request(app)
                    .post('/api/authentication/sign-in')
                    .send({
                        username: 'not-valid-username',
                        password: 'not-valid-password'
                    })

                expect(response.statusCode).toEqual(404);
                expect(response.body.status).toEqual(false);
                expect(response.body.message).toBe('User not found')
            });
        })

    })

    afterAll(async () => {
        await disconectFromDatabase()
            .catch(() => {
                console.log('Error closing database connection');
            });
    })

})