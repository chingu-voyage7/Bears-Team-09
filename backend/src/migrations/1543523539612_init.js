exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        email: { type: 'varchar(254)', notNull: true, unique: true, primaryKey: true },
        first_name: {type: 'varchar(30)', notNull: true},
        last_name: {type: 'varchar(150)', notNull: true},
        password: {type: 'varchar(128)', notNull: true},
        bio: {type: 'varchar(500)', notNull: true, default: ''},
      });
};

exports.down = (pgm) => {
    pgm.dropTable('users', {ifExists: true, cascade: true});
}
