const request = require('supertest');
const { User } = require('../../models/user');

let server;

const postReq = {
  "name": "deepak",
  "mobile": "9988252428",
  "email": "deepak2@yopmail.com",
  "password": "123456"
};

describe('Auth APIs Testing ...', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => {
    await server.close();
    // await User.deleteMany({});
  });

  describe('Auth Sign UP /', () => {
    // Create Post Request Object
    const exec = async () => {
      return await request(server)
        .post('/api/auth/signup')
        .send(postReq);
    }

    it('save the user if it is valid', async () => {
      await User.deleteMany({});
      await exec();
      const user = await User.find({ name: postReq.name });
      expect(user).not.toBeNull();
    });

    it('return the user if it is valid', async () => {
      await User.deleteMany({});
      const res = await exec();
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('name', postReq.name);
    });
  });

  describe('Auth Login /', () => {
    loginReq = {
      "email": postReq.email,
      "password": postReq.password
    };

    // Create Post Request Object
    const exec = async () => {
      return await request(server)
        .post('/api/auth/login')
        .send(loginReq);
    }

    it('return the user if it is valid', async () => {
      const res = await exec();
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('email', loginReq.email);
    });
  });

  describe('Auth Forgot Password /', () => {
    reqObj = {
      "email": postReq.email
    };

    // Create Post Request Object
    const exec = async () => {
      return await request(server)
        .post('/api/auth/forgot-password')
        .send(reqObj);
    }

    it('return the user if it is valid', async () => {
      const res = await exec();
      forgotPasswordToken = res.body.data.forgotPasswordToken;
      expect(res.body.data).toHaveProperty('email', reqObj.email);
    });
  });

  describe('Auth Verify Forgot Password Token /', () => {
    reqObj = { "email": postReq.email };

    // Create Post Request Object
    const exec = async () => {
      return await request(server)
        .post('/api/auth/forgot-password')
        .send(reqObj);
    }


    // Create Post Request Object
    const execVerify = async () => {
      const res = await exec();
      return await request(server)
        .get('/api/auth/verify-forgot-password-token/' + res.body.data.forgotPasswordToken);
    }

    it('return the user if it is valid', async () => {
      const resVerify = await execVerify();
      expect(resVerify.body.data).toHaveProperty('email', reqObj.email);
    });
  });

  describe('Auth Reset Password /', () => {
    reqObj = { "email": postReq.email };

    reqObjResetP = {
      "token": "",
      "newPassword": "123456",
      "confirmPassword": "123456",
    };

    // Function: Forgot Password
    const exec = async () => {
      return await request(server)
        .post('/api/auth/forgot-password')
        .send(reqObj);
    }

    // Function: Reset Password
    const execVerify = async () => {
      const res = await exec();
      reqObjResetP.token = res.body.data.forgotPasswordToken;

      return await request(server)
        .post('/api/auth/reset-password')
        .send(reqObjResetP);
    }

    it('return the user if it is valid', async () => {
      const resVerify = await execVerify();
      expect(resVerify.body.data).toHaveProperty('email', reqObj.email);
    });
  });

  describe('Auth Update Password /', () => {
    loginReq = {
      "email": postReq.email,
      "password": postReq.password
    };

    reqObjResetP = {
      "currentPassword": "123456",
      "newPassword": "123456",
      "confirmPassword": "123456"
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
        .post('/api/auth/update-password')
        .set('x-auth-token', res.body.data.token)
        .send(reqObjResetP);
    }

    it('return the user if it is valid', async () => {
      // Update User
      const resVerify = await execUpdate();
      expect(resVerify.body.data).toHaveProperty('email', reqObj.email);
    });
  });
});