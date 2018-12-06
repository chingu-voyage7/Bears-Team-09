const chai = require('chai');

const { expect } = chai;

const db = require('../models/db');
const User = require('../models/User');
const Place = require('../models/Place');
const Activity = require('../models/Activity');

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

describe('Test Place Model', () => {

    const placeData = [
        { country: "Canada", city: "Toronto" },
        { country: "United States of America", city: "Washington" },
        { country: "Cambodia", city: "Paris" }
    ];

    placeData.forEach((data, pos) => {
        describe(`Create a place #${pos + 1}`, () =>{
            let result;
            let error;
            before((done) => {
                const place = new Place({...data});
                place.create()
                .then(res => {
                    result = res;
                })
                .catch(err => {
                    error = err;
                })
                .finally(() => done());
            });

            it('Should pass without errors', () => expect(error).to.be.undefined);

            it('Return empty array', () => expect(result).to.length(0));
        });
    });

    describe('List all places', () =>{
        let result;
        let error;
        before((done) => {
            const place = new Place();
            place.read()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });
        it('Should pass without errors', () => expect(error).to.be.undefined);

        it('Should return same amount of places', () => expect(result.length).to.equal(placeData.length));

        it('Should return id of the place', () => expect(result[0]).to.have.nested.property('id'));

        it('Should return country of the place', () => expect(result[0]).to.have.nested.property('country'));

        it('Should return city of the place', () => expect(result[0]).to.have.nested.property('city'));
    });

    describe('Find place by country', () =>{
        let result;
        let error;
        before((done) => {
            const place = new Place({country: placeData[0].country});
            place.search()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });
        it('Should pass without errors', () => expect(error).to.be.undefined);

        it('Should return 1 row', () => expect(result).to.length(1));
    });

    describe('Find all places which country contains Ca', () =>{
        let result;
        let error;
        before((done) => {
            const place = new Place({country: 'Ca'});
            place.search()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });
        it('Should pass without errors', () => expect(error).to.be.undefined);

        it('Should return 2 rows', () => expect(result).to.length(2));
    });

    describe('Delete a place', () =>{
        let result;
        let error;
        before((done) => {
            // Get id of first entry
            const place = new Place({...placeData[0]});
            place.read()
            .then(res => res[0].id)
            .then(id => (new Place({id})).delete())
            .then(() => (new Place()).read())
            .then((res) => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });

        it('Should pass without errors', () => expect(error).to.be.undefined);

        it(`Should be ${placeData.length - 1} entries in the DB table`, () => expect(result.length).to.equal(placeData.length - 1));
    });
});


describe('Test Activity Model', () => {

    const activitiesData = [
        { name: "Sport Avtivities"},
        { name: "Sport Events"},
        { name: "Fishing"}
    ];

    activitiesData.forEach((data, pos) => {
        describe(`Create an activity #${pos + 1}`, () =>{
            let result;
            let error;
            before((done) => {
                const activity = new Activity({...data});
                activity.create()
                .then(res => {
                    result = res;
                })
                .catch(err => {
                    error = err;
                })
                .finally(() => done());
            });

            it('Should pass without errors', () => expect(error).to.be.undefined);

            it('Return empty array', () => expect(result).to.length(0));
        });
    });

    describe('List all activitys', () =>{
        let result;
        let error;
        before((done) => {
            const activity = new Activity();
            activity.read()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });
        it('Should pass without errors', () => expect(error).to.be.undefined);

        it('Should return same amount of activitys', () => expect(result.length).to.equal(activitiesData.length));

        it('Should return id of the activity', () => expect(result[0]).to.have.nested.property('id'));

        it('Should return country of the activity', () => expect(result[0]).to.have.nested.property('name'));
    });

    describe('Find activity by name', () =>{
        let result;
        let error;
        before((done) => {
            const activity = new Activity({name: activitiesData[0].name});
            activity.search()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });
        it('Should pass without errors', () => expect(error).to.be.undefined);

        it('Should return 1 row', () => expect(result).to.length(1));
    });

    describe('Find all activities which country contains "Sport"', () =>{
        let result;
        let error;
        before((done) => {
            const activity = new Activity({name: 'Sport'});
            activity.search()
            .then(res => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });
        it('Should pass without errors', () => expect(error).to.be.undefined);

        it('Should return 2 rows', () => expect(result).to.length(2));
    });

    describe('Delete a activity', () =>{
        let result;
        let error;
        before((done) => {
            // Get id of first entry
            const activity = new Activity({...activitiesData[0]});
            activity.read()
            .then(res => res[0].id)
            .then(id => (new Activity({id})).delete())
            .then(() => (new Activity()).read())
            .then((res) => {
                result = res;
            })
            .catch(err => {
                error = err;
            })
            .finally(() => done());
        });

        it('Should pass without errors', () => expect(error).to.be.undefined);

        it(`Should be ${activitiesData.length - 1} entries in the DB table`, () => expect(result.length).to.equal(activitiesData.length - 1));
    });
});