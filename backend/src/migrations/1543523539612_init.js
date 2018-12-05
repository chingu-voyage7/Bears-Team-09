exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        email: { type: 'varchar(256)', primaryKey: true},
        first_name: {type: 'varchar(128)'},
        last_name: {type: 'varchar(128)'},
        password: {type: 'varchar(256)'},
        bio: {type: 'varchar(1024)'}
    });

    pgm.createTable('activities', {
        id: 'id',
        name: {type: 'varchar(256)', notNull: true, unique: true}
    });

    pgm.createIndex('activities', 'name');

    pgm.createTable('places', {
        id: 'id',
        country: {type: 'varchar(256)', notNull: true},
        city: {type: 'varchar(256)', notNull: true}
    });

    pgm.addConstraint('places', 'places_event_country_city_uniq', {
        unique: ['country', 'city']
    });

    pgm.createTable('events', {
        id: 'id',
        name: {type: 'varchar(256)', notNull: true},
        description: {type: 'text'},
        activity: {
            type: 'integer',
            notNull: true,
            references: '"activities"',
            deferrable: true,
            deferred: true
        },
        place: {
            type: 'integer',
            references: '"places"',
            deferrable: true,
            deferred: true
        },
        date_from: {type: 'datetime'},
        date_to: {type: 'datetime'},
        minpeople: {
            type: 'integer',
            notNull: true,
            default: 2
        },
        maxpeople: {
            type: 'integer'
        }
    });

    // Bridge table for many-to-many relationsheep between `events` and `users`
    pgm.createTable('event_attendees', {
        id: 'id',
        event_id: {
            type: 'integer',
            notNull: true,
            references: '"events"',
            deferrable: true,
            deferred: true
        },
        user_id: {
            type: 'varchar(256)',
            notNull: true,
            references: '"users"',
            deferrable: true,
            deferred: true
        }
    });

    pgm.createIndex('event_attendees', 'event_id');

    pgm.createIndex('event_attendees', 'user_id');

    // `Unique together` constraint
    pgm.addConstraint('event_attendees', 'app_event_attendees_event_id_user_id_uniq', {
        unique: ['user_id', 'event_id']
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users', {ifExists: true, cascade: true});
    pgm.dropTable('activities', {ifExists: true, cascade: true});
    pgm.dropTable('places', {ifExists: true, cascade: true});
    pgm.dropTable('events', {ifExists: true, cascade: true});
    pgm.dropTable('event_attendees', {ifExists: true, cascade: true});
};
