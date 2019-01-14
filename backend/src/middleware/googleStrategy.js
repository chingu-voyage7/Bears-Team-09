const passport = require('passport-strategy');
const util = require('util');


// Extracts bearer token from request and pass it to the verify callback
class GoogleStrategy{
    constructor(verify) {
        passport.Strategy.call(this);
        this.name = 'google';
        this._verify = verify;
        if (!this._verify) {
            throw new TypeError('GoogleStrategy requires a verify callback');
        }
        this.extractToken = (request) => request.query.access_token;
    }

    authenticate(req) {
        const token = this.extractToken(req);
        if (!token) {
            return this.fail(new Error("No access token"));
        }

        const verified = (err, user, info) => {
            if (err) { return this.error(err); }
            if (!user) { return this.fail(info); }
            return this.success(user, info);
        };

        try {
            return this._verify(token, verified);
        } catch (ex) {
            return this.error(ex);
        }
    };
}

util.inherits(GoogleStrategy, passport.Strategy);

module.exports = GoogleStrategy;
