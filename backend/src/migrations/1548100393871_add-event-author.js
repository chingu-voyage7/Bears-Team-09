exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addColumns('events', {author_id: {
        type: 'integer',
        notNull: true,
        references: '"users"',
        deferrable: true,
        deferred: true
    }});
    pgm.createIndex('events', 'author_id');
};

exports.down = (pgm) => {
    pgm.dropColumns('events', {});
    pgm.dropIndex('events', 'author_id');
};
