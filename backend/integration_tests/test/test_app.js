const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const url = process.env.API_URL || 'http://localhost:8000/';

const assert = (result, prop) => expect(result).to.have.nested.property(prop);
const assertNot = (result, prop) => expect(result).to.not.have.nested.property(prop);

const testUser = {
    email: 'kenny@gmail.com',
    password: 'qwerty123'
};

const updatedTestUser = {
    password: '123456',
    first_name: "Kenny",
    last_name: "McCormick",
    bio: "Lorem ipsum"
};

let testUserToken;

describe('Register new user', () => {
    let result;
    before((done) => {
        chai.request(url)
            .post('auth/register')
            .send(testUser)
            .end((err, res) => {
                expect(err).to.be.null;
                result = res;
                done();
            });
    });

    it('should return status code 201', () => assert(result, 'status').to.equal(201));
});

describe('Perform login', () => {
    let result;
    before((done) => {
        chai.request(url)
            .post('auth/login')
            .send(testUser)
            .end((err, res) => {
                expect(err).to.be.null;
                result = res;
                testUserToken = res.body.token;
                done();
            });
    });

    it('should return status code 200', () => assert(result, 'status').to.equal(200));

    it('should return token', () => assert(result, 'body.token').to.be.not.null);
});

describe('Get user info', () => {
    describe('Get info without Authorization header', () => {
        let result;
        before((done) => {
            chai.request(url)
                .get('users')
                .end((err, res) => {
                    expect(err).to.be.null;
                    result = res;
                    done();
                });
        });

        it('should return status code 401', () => assert(result, 'status').to.equal(401));

    });

    describe('Get info with Authorization header', () => {
        let result;
        before((done) => {
            chai.request(url)
                .get('users')
                .set('Authorization', `Bearer ${testUserToken}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    result = res;
                    done();
                });
        });

        it('should return status code 200', () => assert(result, 'status').to.equal(200));

        it('should return id', () => assert(result, 'body').to.have.nested.property('id'));

        it('should return same email', () => assert(result, 'body.email').to.equal(testUser.email));

        it('should return empty fist name', () => assert(result, 'body.first_name').to.be.null);

        it('should return empty last name', () => assert(result, 'body.last_name').to.be.null);

        it('should return empty bio', () => assert(result, 'body.bio').to.be.null);

        it('should not return password', () => assertNot(result, 'body.password'));

        it('should not return token', () => assertNot(result, 'body.token'));
    });
});

describe('Update user info', () => {
    describe('Update without Authorization header', () => {
        let result;
        before((done) => {
            chai.request(url)
                .put('users')
                .send()
                .end((err, res) => {
                    expect(err).to.be.null;
                    result = res;
                    done();
                });
        });

        it('should return status code 401', () => assert(result, 'status').to.equal(401));
    });

    describe('Update with Authorization header', () => {
        let result;
        before((done) => {
            chai.request(url)
                .put('users')
                .set('Authorization', `Bearer ${testUserToken}`)
                .send(updatedTestUser)
                .end((err, res) => {
                    expect(err).to.be.null;
                    result = res;
                    done();
                });
        });

        it('should return status code 200', () => assert(result, 'status').to.equal(200));
    });

    describe('Login with updated password', () => {
        let result;
        before((done) => {
            chai.request(url)
                .post('auth/login')
                .send({email: testUser.email, password: updatedTestUser.password})
                .end((err, res) => {
                    expect(err).to.be.null;
                    result = res;
                    testUserToken = res.body.token;
                    done();
                });
        });

    it('should return status code 200', () => assert(result, 'status').to.equal(200));

    it('should return token', () => assert(result, 'body.token').to.be.not.null);
    });
});