exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        email: { type: 'varchar(256)', notNull: true, unique: true},
        firstname: {type: 'varchar(128)'},
        lastname: {type: 'varchar(128)'},
        password: {type: 'varchar(256)', notNull: true},
        bio: {type: 'varchar(1024)'}
    });

    pgm.createIndex('users', 'email');

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

    pgm.createIndex('places', 'country');
    pgm.createIndex('places', 'city');

    pgm.createTable('events', {
        id: 'id',
        name: {type: 'varchar(256)', notNull: true},
        description: {type: 'text'},
        activityid: {
            type: 'integer',
            notNull: true,
            references: '"activities"',
            deferrable: true,
            deferred: true
        },
        placeid: {
            type: 'integer',
            references: '"places"',
            deferrable: true,
            deferred: true
        },
        datefrom: {type: 'datetime'},
        dateto: {type: 'datetime'},
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
        eventid: {
            type: 'integer',
            notNull: true,
            references: '"events"',
            deferrable: true,
            deferred: true
        },
        userid: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            deferrable: true,
            deferred: true
        }
    });

    pgm.createIndex('event_attendees', 'eventid');

    pgm.createIndex('event_attendees', 'userid');

    // `Unique together` constraint
    pgm.addConstraint('event_attendees', 'event_attendees_event_id_user_id_uniq', {
        unique: ['userid', 'eventid']
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users', {ifExists: true, cascade: true});
    pgm.dropTable('activities', {ifExists: true, cascade: true});
    pgm.dropTable('places', {ifExists: true, cascade: true});
    pgm.dropTable('events', {ifExists: true, cascade: true});
    pgm.dropTable('event_attendees', {ifExists: true, cascade: true});
};
