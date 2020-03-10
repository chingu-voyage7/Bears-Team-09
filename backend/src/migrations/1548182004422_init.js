exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("users", {
    id: "id",
    email: { type: "varchar(256)", notNull: true, unique: true },
    first_name: { type: "varchar(128)" },
    last_name: { type: "varchar(128)" },
    password: { type: "varchar(256)", notNull: false },
    image: { type: "varchar(128)" },
    bio: { type: "varchar(1024)" }
  });

  pgm.createIndex("users", "email");

  pgm.createTable("activities", {
    id: "id",
    name: { type: "varchar(256)", notNull: true, unique: true }
  });

  pgm.createIndex("activities", "name");

  pgm.createTable("places", {
    id: "id",
    country: { type: "varchar(256)", notNull: true },
    city: { type: "varchar(256)", notNull: true }
  });

  pgm.addConstraint("places", "places_event_country_city_uniq", {
    unique: ["country", "city"]
  });

  pgm.createIndex("places", "country");
  pgm.createIndex("places", "city");

  pgm.createTable("events", {
    id: "id",
    name: { type: "varchar(256)", notNull: true },
    image: { type: "varchar(128)" },
    description: { type: "text" },
    author_id: {
      type: "integer",
      notNull: false,
      references: '"users"',
      onDelete: "set null",
      deferrable: true,
      deferred: true
    },
    activity_id: {
      type: "integer",
      notNull: false,
      references: '"activities"',
      onDelete: "set null",
      deferrable: true,
      deferred: true
    },
    place_id: {
      type: "integer",
      references: '"places"',
      onDelete: "set null",
      deferrable: true,
      deferred: true
    },
    date_from: { type: "datetime" },
    date_to: { type: "datetime" },
    min_people: {
      type: "integer",
      notNull: true,
      default: 2
    },
    max_people: {
      type: "integer"
    }
  });
  pgm.createIndex("events", "author_id");

  // Bridge table for many-to-many relationsheep between `events` and `users`
  pgm.createTable("event_attendees", {
    id: "id",
    event_id: {
      type: "integer",
      notNull: true,
      references: '"events"',
      onDelete: "cascade",
      deferrable: true,
      deferred: true
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
      deferrable: true,
      deferred: true
    }
  });

  pgm.createIndex("event_attendees", "event_id");

  pgm.createIndex("event_attendees", "user_id");

  // `Unique together` constraint
  pgm.addConstraint(
    "event_attendees",
    "event_attendees_event_id_user_id_uniq",
    {
      unique: ["user_id", "event_id"]
    }
  );
};

exports.down = pgm => {
  pgm.dropTable("users", { ifExists: true, cascade: true });
  pgm.dropTable("activities", { ifExists: true, cascade: true });
  pgm.dropTable("places", { ifExists: true, cascade: true });
  pgm.dropTable("events", { ifExists: true, cascade: true });
  pgm.dropTable("event_attendees", { ifExists: true, cascade: true });
};
