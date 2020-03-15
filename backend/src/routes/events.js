const express = require("express");
const passport = require("passport");
const Event = require("../models/Event");
const Attendee = require("../models/EventAttendee");
const APIError = require("../utils/APIError.js");
const upload = require("../utils/upload");
const authenticate = require("../middleware/localAuth");

const router = express.Router();

// list all events, with parameters
router.get("/", (req, res) => {
  const newEvent = new Event(req.query);
  newEvent
    .read()
    .then(data => {
      res.json({ events: data });
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

// create an event
router.post("/", passport.authenticate("jwt"), (req, res) => {
  const newEvent = new Event({ author_id: req.user.data.id, ...req.body });
  newEvent
    .create()
    .then(([data]) => {
      newEvent.data = data;
      const attendee = new Attendee({
        user_id: req.user.data.id,
        event_id: data.id
      });
      return attendee.create();
    })
    .then(() => {
      res.status(201).json(newEvent.data);
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

// get event info
router.get("/:id", (req, res) => {
  const newEvent = new Event({ id: req.params.id });
  newEvent
    .read()
    .then(([data]) => {
      if (data === undefined) {
        throw new APIError(`event #${req.params.id} not found`, 404);
      }
      res.json(data);
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.get("/:id/attendees", (req, res) => {
  const attendees = new Attendee({ event_id: req.params.id });
  new Event({ id: req.params.id })
    .read()
    .then(([data]) => {
      if (data === undefined) {
        throw new APIError(`event #${req.params.id} not found`, 404);
      }
      return attendees.getAllAttendees();
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

// delete an event
router.delete("/:id", passport.authenticate("jwt"), (req, res) => {
  const newEvent = new Event({ id: req.params.id });
  newEvent
    .read()
    .then(([data]) => {
      if (data === undefined) {
        throw new APIError(`event #${req.params.id} not found`, 404);
      } else if (data.author_id !== req.user.data.id) {
        throw new APIError(`you are not the author of event #${req.params.id}`, 403);
      }
      return newEvent.delete();
    })
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

// update an event
router.put("/:id", passport.authenticate("jwt"), (req, res) => {
  const { id, ...newData } = req.body;
  const newEvent = new Event({ id: req.params.id, ...newData });
  new Event({ id: req.params.id })
    .read()
    .then(([data]) => {
      if (data === undefined) {
        throw new APIError(`event #${req.params.id} not found`, 404);
      } else if (data.author_id !== req.user.data.id) {
        throw new APIError(`you are not the author of event #${req.params.id}`, 403);
      }
      return newEvent.update();
    })
    .then(() => {
      res.json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

// subscribe to attend an event
router.post("/:id/attend", passport.authenticate("jwt"), (req, res) => {
  const attendees = new Attendee({ event_id: req.params.id });
  const attendee = new Attendee({
    user_id: req.user.data.id,
    event_id: req.params.id
  });
  let maxPeople;
  new Event({ id: req.params.id })
    .read()
    .then(([data]) => {
      if (!data) {
        throw new APIError(`event #${req.params.id} not found`, 404);
      } else if (Number(data.author_id) === Number(req.user.data.id)) {
        throw new APIError("cant subscribe your own event", 403);
      }
      maxPeople = Number(data.max_people);
      return attendees.read();
    })
    .then(data => {
      if (data.filter(user => user.user_id === req.user.data.id).length === 1) {
        throw new APIError("you are already in the attendees list", 400);
      } else if (maxPeople && data.length >= maxPeople) {
        throw new APIError("event is completely booked", 403);
      }
      return attendee.create();
    })
    .then(() => {
      res.status(201).json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.post("/:id/images", passport.authenticate("jwt"), (req, res) => {
  const imageHandler = upload("events", {
    width: 500,
    height: 500,
    crop: "limit"
  }).single("file");
  // check if event exists
  new Event({ id: req.params.id })
    .read()
    .then(([data]) => {
      if (data === undefined) {
        throw new APIError(`event #${req.params.id} not found`, 404);
      } else if (data.author_id !== req.user.data.id) {
        throw new APIError(`you are not the author of event #${req.params.id}`, 403);
      }
    })
    .then(() => {
      // upload image
      imageHandler(req, res, err => {
        if (err) {
          // upload failed
          res.status(400).json({ message: err.message });
        } else if (!req.file) {
          res.status(400).json({ message: "File is not set" });
        } else {
          new Event({ id: req.params.id, image: req.file.secure_url })
            .update()
            // update failed
            .catch(e => res.status(400).json({ message: e.message }));
          res.status(201).json({ url: req.file.secure_url });
        }
      });
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
  return res;
});

// unsubscribe from attending an event
router.delete("/:id/attend", passport.authenticate("jwt"), (req, res) => {
  const attendee = new Attendee({
    user_id: req.user.data.id,
    event_id: req.params.id
  });
  new Event({ id: req.params.id })
    .read()
    .then(([data]) => {
      if (!data) {
        throw new APIError(`event not #${req.params.id} found`, 404);
      } else if (Number(data.author_id) === Number(req.user.data.id)) {
        throw new APIError("cant unsubscribe from your own event", 403);
      }
      return attendee.read();
    })
    .then(([data]) => {
      if (!data) {
        throw new APIError("you are not attendee of this event", 400);
      }
      attendee.data.id = data.id;
      return attendee.delete();
    })
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

module.exports = router;
