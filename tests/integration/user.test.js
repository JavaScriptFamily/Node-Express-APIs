const request = require('supertest');
const { User } = require('../../models/user');

let server;

const postReq = {
    "name": "deepak",
    "mobile": "9988252428",
    "email": "deepak2@yopmail.com",
    "password": "123456"
};

describe('User APIs Testing ...', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        await server.close();
        // await User.deleteMany({});
    });

    describe('User View /', () => {
        loginReq = {
            "email": postReq.email,
            "password": postReq.password
        };

        // Function: Login User
        const exec = async () => {
            return await request(server)
                .post('/api/auth/login')
                .send(loginReq);
        }

        // Function: View User
        const execUpdate = async () => {
            // Login User
            const res = await exec();
            return await request(server)
                .get('/api/user/view')
                .set('x-auth-token', res.body.data.token);
        }

        it('return the user if it is valid', async () => {
            // Update User
            const resVerify = await execUpdate();
            expect(resVerify.body.data).toHaveProperty('email', loginReq.email);
        });
    });

    describe('User Edit /', () => {
        loginReq = {
            "email": postReq.email,
            "password": postReq.password
        };

        // Function: Login User
        const exec = async () => {
            return await request(server)
                .post('/api/auth/login')
                .send(loginReq);
        }

        // Function: Update Password
        const execUpdate = async () => {
            // Login User
            const res = await exec();
            return await request(server)
                .post('/api/user/edit')
                .set('Content-type', 'multipart/form-data')
                .field('name', 'Gurudutt')
                .field('mobile', '9988252428')
                .field('gender', 'Male')
                .attach('img', 'C:/Users/Dreams/Pictures/1.JPG')
                .set('x-auth-token', res.body.data.token);
        }

        it('return the user if it is valid', async () => {
            // Update User
            const resVerify = await execUpdate();
            expect(resVerify.body.data).toHaveProperty('email', loginReq.email);
        });
    });
});