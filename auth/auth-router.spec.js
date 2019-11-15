const request = require('supertest');
const server = require('../api/server');


describe('auth-router', () => {
    describe('[POST] / register', () => {
        // it('should register user with valid credentials', () => {
        //     const new_user = {
        //         "username": "chioma123",
        //         "password": "chioma1"
        //     }
        //     //Put in new credentials when testing
        //     return request(server).post('/api/auth/register')
        //         .send(new_user)
        //         .then((res) => {
        //             expect(res.status).toBe(201);
        //         })
        // });
        it('should not register user with invalid credentials', () => {
            const new_user = {
                "username": "John Wick"
            }
            return request(server).post('/api/auth/register')
                .send(new_user)
                .then((res) => {
                    expect(res.status).toBe(401);
                })
        });
    });

    describe('[POST] / login', () => {
        it('should not allow user with invalid credentials log in', () => {
            const existing_user = {
                "username": "admin"
            }
            return request(server).post('/api/auth/login')
                .send(existing_user)
                .then((res) => {
                    expect(res.status).toBe(401);
                })
        });
        it('should tell user required fields if invalid', () => {
            const existing_user = {
                "username": "admin"
            }

            const expectedBody = { message: "username and password required" };
            return request(server).post('/api/auth/login')
                .send(existing_user)
                .then((res) => {
                    expect(res.body).toEqual(expectedBody);
                })
        });
    });
});