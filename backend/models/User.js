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
                .catch(err => reject(err))
            } else {
                return reject('User not found');
            }
        });
    }
}

module.exports = User;