exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('users', 'password', {notNull: false});
};

exports.down = (pgm) => {
    pgm.alterColumn('users', 'password', {notNull: true});
};
