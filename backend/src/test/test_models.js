const chai = require("chai");

const { expect } = chai;

const db = require("../models/db");
const User = require("../models/User");
const Place = require("../models/Place");
const Activity = require("../models/Activity");
const Events = require("../models/Event");
const Attendee = require("../models/EventAttendee");

describe("DB is accessible", () => {
  let error;
  before(done => {
    db.query("SELECT 1;")
      .then(() => {
        console.log("Got response from DB");
      })
      .catch(err => {
        error = err;
      })
      .finally(() => done());
  });
  it("Should pass without errors", () => expect(error).to.be.undefined);
});

describe("DB has all tables", () => {
  let result;
  let error;
  before(done => {
    db.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = $1;", ["public"])
      .then(res => {
        result = res.reduce((acc, val) => {
          acc.push(val.tablename);
          return acc;
        }, []);
      })
      .catch(err => {
        error = err;
      })
      .finally(() => done());
  });
  it("Should pass without errors", () => expect(error).to.be.undefined);

  it("Should contain users", () => expect(result).to.contain("users"));

  it("Should contain events", () => expect(result).to.contain("events"));

  it("Should contain places", () => expect(result).to.contain("places"));

  it("Should contain activities", () => expect(result).to.contain("activities"));

  it("Should contain event_attendees", () => expect(result).to.contain("event_attendees"));
});

describe("Test User Model", () => {
  const userData = {
    email: "kenny@gmail.com",
    password: "qwerty123"
  };

  let firstPassword;

  const updatedUserData = {
    email: "kenny@gmail.com",
    password: "123456",
    first_name: "Kenny",
    last_name: "McCormick",
    bio: "lorem ipsum"
  };

  describe("Create user", () => {
    let result;
    let error;
    before(done => {
      const user = new User(userData);
      user
        .create()
        .then(() => {
          userData.id = user.data.id;
          result = user.data;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Should pass without error", () => expect(error).to.be.undefined);

    it("Should have id", () => expect(result).to.have.nested.property("id"));
  });

  describe("Read user info", () => {
    let result;
    let error;
    before(done => {
      const user = new User({ email: userData.email });
      user
        .read()
        .then(res => {
          result = res;
          firstPassword = result[0].password;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Should pass without error", () => expect(error).to.be.undefined);

    it("Should return 1 element", () => expect(result).to.length(1));

    it("Should return id", () => expect(result[0]).to.have.nested.property("id"));

    it("Should return email", () => expect(result[0]).to.have.nested.property("email"));

    it("Should return password", () => expect(result[0]).to.have.nested.property("password"));

    it("Should return first name", () => expect(result[0]).to.have.nested.property("first_name"));

    it("Should return last name", () => expect(result[0]).to.have.nested.property("last_name"));

    it("Should return bio", () => expect(result[0]).to.have.nested.property("bio"));
  });

  describe("Update user", () => {
    let result;
    let error;

    before(done => {
      const user = new User({ id: userData.id, ...updatedUserData });
      user
        .update()
        .then(() => user.read())
        .then(([res]) => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Pass without error", () => expect(error).to.be.undefined);

    it("Return new password", () => expect(result.password).to.not.equal(firstPassword));

    it("Should return new first name", () => expect(result.first_name).to.equal(updatedUserData.first_name));

    it("Should return new last name", () => expect(result.last_name).to.equal(updatedUserData.last_name));

    it("Should return new bio", () => expect(result.bio).to.equal(updatedUserData.bio));
  });

  describe("Delete user", () => {
    let error;
    before(done => {
      const user = new User({ email: userData.email });
      user
        .read()
        .then(() => user.delete())
        .then(() => user.read())
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Should contain statusCode", () => expect(error).to.have.nested.property("statusCode"));
  });
});

describe("Test Place Model", () => {
  const placeData = [
    { country: "Canada", city: "Toronto" },
    { country: "United States of America", city: "Washington" },
    { country: "Cambodia", city: "Paris" }
  ];

  placeData.forEach((data, pos) => {
    describe(`Create a place #${pos + 1}`, () => {
      let result;
      let error;
      before(done => {
        const place = new Place({ ...data });
        place
          .create()
          .then(([res]) => {
            result = res;
          })
          .catch(err => {
            error = err;
          })
          .finally(() => done());
      });

      it("Should pass without errors", () => expect(error).to.be.undefined);

      it("Should have an id", () => expect(result).to.have.nested.property("id"));
    });
  });

  describe("List all places", () => {
    let result;
    let error;
    before(done => {
      const place = new Place();
      place
        .read()
        .then(res => {
          result = res;
          res.forEach((row, pos) => {
            placeData[pos].id = row.id;
          });
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return same amount of places", () => expect(result.length).to.equal(placeData.length));

    it("Should return id of the place", () => expect(result[0]).to.have.nested.property("id"));

    it("Should return country of the place", () => expect(result[0]).to.have.nested.property("country"));

    it("Should return city of the place", () => expect(result[0]).to.have.nested.property("city"));
  });

  describe("Find place by country", () => {
    let result;
    let error;
    before(done => {
      const place = new Place({ country: placeData[0].country });
      place
        .read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return 1 row", () => expect(result).to.length(1));
  });

  describe("Find all places which country contains Ca", () => {
    let result;
    let error;
    before(done => {
      const place = new Place({ country: "Ca", compare: "in" });
      place
        .read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return 2 rows", () => expect(result).to.length(2));
  });

  describe("Delete a place", () => {
    let result;
    let error;
    before(done => {
      // Get id of first entry
      const place = new Place({ ...placeData[0] });
      place
        .read()
        .then(res => res[0].id)
        .then(id => new Place({ id }).delete())
        .then(() => new Place().read())
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Should pass without errors", () => expect(error).to.be.undefined);

    it(`Should be ${placeData.length - 1} entries in the DB table`, () =>
      expect(result.length).to.equal(placeData.length - 1));
  });
});

describe("Test Activity Model", () => {
  const activitiesData = [{ name: "Sport Activities" }, { name: "Sport Events" }, { name: "Fishing" }];

  activitiesData.forEach((data, pos) => {
    describe(`Create an activity #${pos + 1}`, () => {
      let result;
      let error;
      before(done => {
        const activity = new Activity({ ...data });
        activity
          .create()
          .then(([res]) => {
            result = res;
          })
          .catch(err => {
            error = err;
          })
          .finally(() => done());
      });

      it("Should pass without errors", () => expect(error).to.be.undefined);

      it("Should have an id", () => expect(result).to.have.nested.property("id"));
    });
  });

  describe("List all activities", () => {
    let result;
    let error;
    before(done => {
      const activity = new Activity();
      activity
        .read()
        .then(res => {
          result = res;
          res.forEach((row, pos) => {
            activitiesData[pos].id = row.id;
          });
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return same amount of activitys", () => expect(result.length).to.equal(activitiesData.length));

    it("Should return id of the activity", () => expect(result[0]).to.have.nested.property("id"));

    it("Should return country of the activity", () => expect(result[0]).to.have.nested.property("name"));
  });

  describe("Find activity by name", () => {
    let result;
    let error;
    before(done => {
      const activity = new Activity({ name: activitiesData[0].name });
      activity
        .read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return 1 row", () => expect(result).to.length(1));
  });

  describe('Find all activities which country contains "Sport"', () => {
    let result;
    let error;
    before(done => {
      const activity = new Activity({ name: "Sport", compare: "in" });
      activity
        .read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return 2 rows", () => expect(result).to.length(2));
  });

  describe("Delete a activity", () => {
    let result;
    let error;
    before(done => {
      // Get id of first entry
      const activity = new Activity({ ...activitiesData[0] });
      activity
        .read()
        .then(res => res[0].id)
        .then(id => new Activity({ id }).delete())
        .then(() => new Activity().read())
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Should pass without errors", () => expect(error).to.be.undefined);

    it(`Should be ${activitiesData.length - 1} entries in the DB table`, () =>
      expect(result.length).to.equal(activitiesData.length - 1));
  });
});

describe("Test Event Model", () => {
  let user;
  before(done => {
    user = new User({ email: "kenny@gmail.com", password: "123456" });
    user.create().finally(() => done());
  });
  const eventsData = [
    {
      name: "Fishing",
      description: "Some description",
      activity_id: 2,
      max_people: 4
    },
    {
      name: "Dancing",
      description: "Some description",
      activity_id: 2,
      max_people: 4
    },
    {
      name: "Singing",
      description: "Some description",
      activity_id: 3,
      place_id: 2,
      date_from: new Date(),
      date_to: new Date(),
      max_people: 10
    },
    {
      name: "Doing nothing",
      description: "Some description",
      activity_id: 2,
      place_id: 2,
      date_from: new Date(),
      date_to: new Date(),
      max_people: 2
    }
  ];

  eventsData.forEach((data, pos) => {
    describe(`Create an event #${pos + 1}`, () => {
      let result;
      let error;
      before(done => {
        const ev = new Events({ author_id: user.data.id, ...data });
        ev.create()
          .then(([res]) => {
            result = res;
          })
          .catch(err => {
            error = err;
          })
          .finally(() => done());
      });

      it("Should pass without errors", () => expect(error).to.be.undefined);

      it("Should have an id", () => expect(result).to.have.nested.property("id"));
    });
  });

  describe("List all events", () => {
    let result;
    let error;
    before(done => {
      const ev = new Events();
      ev.read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return same amount of events", () => expect(result.length).to.equal(eventsData.length));

    it("Should return id of the event", () => expect(result[0]).to.have.nested.property("id"));

    it("Should return name of the event", () => expect(result[0]).to.have.nested.property("name"));

    it("Should return description of the event", () => expect(result[0]).to.have.nested.property("description"));

    it("Should return activity of the event", () => expect(result[0]).to.have.nested.property("activity"));

    it("Should return place of the event", () => expect(result[0]).to.have.nested.property("country"));

    it("Should return place of the event", () => expect(result[0]).to.have.nested.property("city"));

    it("Should return date_from of the event", () => expect(result[0]).to.have.nested.property("date_from"));

    it("Should return date_to of the event", () => expect(result[0]).to.have.nested.property("date_to"));

    it("Should return min_people of the event", () => expect(result[0]).to.have.nested.property("min_people"));

    it("Should return max_people of the event", () => expect(result[0]).to.have.nested.property("max_people"));
  });

  describe("Find event by name", () => {
    let result;
    let error;
    before(done => {
      const ev = new Events({ name: eventsData[0].name });
      ev.read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return 1 row", () => expect(result).to.length(1));
  });

  describe('Find all events which name has "D"', () => {
    let result;
    let error;
    before(done => {
      const ev = new Events({ name: "D", compare: "in" });
      ev.read()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });
    it("Should pass without errors", () => expect(error).to.be.undefined);

    it("Should return 2 rows", () => expect(result).to.length(2));
  });

  describe("Delete an event", () => {
    let result;
    let error;
    before(done => {
      // Get id of first entry
      const ev = new Events({ ...eventsData[0] });
      ev.read()
        .then(res => res[0].id)
        .then(id => new Events({ id }).delete())
        .then(() => new Events().read())
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => done());
    });

    it("Should pass without errors", () => expect(error).to.be.undefined);

    it(`Should be ${eventsData.length - 1} entries in the DB table`, () =>
      expect(result.length).to.equal(eventsData.length - 1));
  });
});

describe("Test EventAttendee Model", () => {
  let error;
  let user1;
  let user2;
  let event1;
  let event2;
  let event3;
  describe("Populate db", () => {
    before(done => {
      user1 = new User({ email: "AAA@mail.com", password: "123456" });
      user2 = new User({ email: "BBB@mail.com", password: "123456" });
      event1 = new Events({
        name: "Event A",
        description: "Some description",
        activity_id: 2,
        max_people: 4
      });
      event2 = new Events({
        name: "Event B",
        description: "Some description",
        activity_id: 2,
        max_people: 4
      });
      event3 = new Events({
        name: "Event C",
        description: "Some description",
        activity_id: 2,
        max_people: 4
      });
      user1
        .create()
        .then(() => user2.create())
        .then(() => {
          event1.data.author_id = user1.data.id;
          return event1.create();
        })
        .then(() => {
          event2.data.author_id = user1.data.id;
          return event2.create();
        })
        .then(() => {
          event3.data.author_id = user1.data.id;
          return event3.create();
        })
        .then(() => new Events().read())
        .then(data => {
          [event1, event2, event3] = data.slice(-3);
        })
        .then(() => new Attendee({ user_id: user1.data.id, event_id: event1.id }).create())
        .then(() => new Attendee({ user_id: user1.data.id, event_id: event2.id }).create())
        .then(() => new Attendee({ user_id: user1.data.id, event_id: event3.id }).create())
        .then(() => new Attendee({ user_id: user2.data.id, event_id: event1.id }).create())
        .then(() => new Attendee({ user_id: user2.data.id, event_id: event3.id }).create())
        .catch(err => {
          error = err;
        })
        .finally(() => {
          done();
        });
    });

    it("Should run without errors", () => expect(error).to.be.undefined);
  });

  describe("Get all events attended by User1", () => {
    let result;
    before(done => {
      new Attendee({ user_id: user1.data.id })
        .getAllEvents()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => {
          done();
        });
    });

    it("Should run without errors", () => expect(error).to.be.undefined);

    it("Should return 3 entries", () => expect(result).to.be.length(3));
  });

  describe("Get all events attended by User2", () => {
    let result;
    before(done => {
      new Attendee({ user_id: user2.data.id })
        .getAllEvents()
        .then(res => {
          result = res;
        })
        .catch(err => {
          error = err;
        })
        .finally(() => {
          done();
        });
    });

    it("Should run without errors", () => expect(error).to.be.undefined);

    it("Should return 2 entries", () => expect(result).to.be.length(2));
  });
});
