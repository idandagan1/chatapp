/* global beforeEach, afterEach, it, describe */
const expect = require('expect.js');
const User = require('../lib/user');

describe('User', () => {

    describe('user factory', () => {
        it('should contain constructor', (done) => {
            expect(User).to.be.a('function');
            done();
        })
    })

    describe('when supplying valid inputs', () => {

        let user;
        const params = {
            name: 'bla bla',
            uid: 12345
        }

        beforeEach(() => {
            user = User(params.uid, params.name);
        });

        afterEach(() => {
            User.logout(params.uid);
        });

        it('should create a user obj', (done) => {
            expect(user.name).to.eql(params.name);
            expect(user.uid).to.eql(params.uid);
            done();
        })

        it('should return number of users', (done) => {
            const users = User.getUsers();
            const count = Object.keys(users).length;
            expect(count).to.be.greaterThan(0);
            done();
        })

        it('should return user by id', (done) => {
            const user = User.getUserById(params.uid);
            expect(user.name).to.eql(params.name);
            done();
        })
    })

    describe('when supplying invalid inputs', () => {

        it('should return error obj', (done) => {
            const user = User('bla bla');
            expect(user instanceof Error).to.be(true);
            done();
        });

        it('should return undefined', (done) => {
            const user = User.getUserById();
            expect(user).to.be(undefined);
            done();
        })

    });

});
