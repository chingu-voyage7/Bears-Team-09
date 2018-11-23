const bcrypt = require('bcrypt');

class User {
    constructor(email) {
        this.email = email;
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            if (this.email === 'user1@mail.com') {
                bcrypt.hash('qwerty123', 10)
                .then(hashedPassword => {
                    return resolve({
                        email: this.email,
                        password: hashedPassword
                    });
                })
                .catch(err => reject({message: err}))
            } else {
                return reject({message: 'Incorrect credentials'});
            }
        });
    }
}

module.exports = User;