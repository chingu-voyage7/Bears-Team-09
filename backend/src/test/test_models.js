const chai = require('chai');

const { expect } = chai;

const db = require('../models/db');
const User = require('../models/User');

const userData = {
    email: 'kenny@gmail.com',
    password: 'qwerty123'
};

let firstPassword;

const updatedUserData = {
    email: 'kenny@gmail.com',
    password: '123456',
    first_name: 'Kenny',
    last_name: 'McCormick',
    bio: 'lorem ipsum'
};

describe('DB is accessible', () => {
    let error;
    before((done) => {
        db.query("SELECT 1;")
        .then(() => {
            console.log('Got response from DB');
        })
        .catch((err) => {
            error = err;
        })
        .finally(() => done());
    });
    it('Should pass without errors', () => expect(error).to.be.undefined);
});

describe('DB has all tables', () => {
    let result;
    let error;
    before((done) => {
        db.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = $1;", ['public'])
        .then((res) => {
            result = res.reduce((acc, val) => {
                acc.push(val.tablename);
                return acc;
            }, []);
        })
        .catch((err) => {
            error = err;
        })
        .finally(() => done());
    });
    it('Should pass without errors', () => expect(error).to.be.undefined);

    it('Should contain users', () => expect(result).to.contain('users'));

    it('Should contain users', () => expect(result).to.contain('events'));

    it('Should contain users', () => expect(result).to.contain('places'));

    it('Should contain users', () => expect(result).to.contain('activities'));

    it('Should contain users', () => expect(result).to.contain('event_attendees'));
});

describe('Test User Model', () => {
    describe('Create user', () => {
        let result;
        let error;
        before((done) => {
            const user = new User({...userData});
            user.create()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });

        it('Pass without error', () => expect(error).to.be.undefined);

        it('Return empty array', () => expect(result).to.be.empty);
    });

    describe('Read user info', () => {
        let result;
        let error;
        before((done) => {
            const user = new User({...userData});
            user.read()
            .then(res => {
                result = res;
                firstPassword = result[0].password;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });

        it('Pass without error', () => expect(error).to.be.undefined);

        it('Return 1 element', () => expect(result).to.length(1));

        it('Should return email', () => expect(result[0]).to.have.nested.property('email'));

        it('Should return password', () => expect(result[0]).to.have.nested.property('password'));

        it('Should return first name', () => expect(result[0]).to.have.nested.property('first_name'));

        it('Should return last name', () => expect(result[0]).to.have.nested.property('last_name'));

        it('Should return bio', () => expect(result[0]).to.have.nested.property('bio'));
    });

    describe('Update user', () => {
        let result;
        let error;

        before((done) => {
            const user = new User({...updatedUserData});
            user.update()
            .then(() => user.read())
            .then(res => { [result] = res; })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });

        it('Pass without error', () => expect(error).to.be.undefined);

        it('Return new password', () => expect(result.password).to.not.equal(firstPassword));

        it('Return new first name', () => expect(result.first_name).to.equal(updatedUserData.first_name));

        it('Return new last name', () => expect(result.last_name).to.equal(updatedUserData.last_name));

        it('Return new bio', () => expect(result.bio).to.equal(updatedUserData.bio));

    });

    describe('Delete user', () => {
        let result;
        let error;
        before((done) => {
            const user = new User({...userData});
            user.delete()
            .then(() => user.read())
            .then(res => { result = res; })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });

        it('Pass without error', () => expect(error).to.be.undefined);

        it('Return empty array', () => expect(result).to.length(0));
    });
});