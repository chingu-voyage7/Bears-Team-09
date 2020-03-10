const express = require("express");
const User = require("../models/User");
const Attendee = require("../models/EventAttendee");

const router = express.Router();
const upload = require("../utils/upload");

router.get("/", (req, res) => {
  const user = new User({ id: req.user.id });
  user
    .read()
    .then(() => {
      res.json(user.data);
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.delete("/", (req, res) => {
  req.user
    .delete()
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.put("/", (req, res) => {
  const { id, ...newData } = req.body;
  const user = new User({ id: req.user.id, ...newData });
  user
    .update()
    .then(() => {
      res.json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.get("/events", (req, res) => {
  const attendee = new Attendee({ user_id: req.user[req.user.pk] });
  attendee
    .getAllEvents()
    .then(data => {
      res.json({ events: data });
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.get("/:id/events", (req, res) => {
  const attendee = new Attendee({ user_id: req.params.id });
  attendee
    .getAllEvents()
    .then(data => {
      res.json({ events: data });
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.post("/images", (req, res) => {
  const imageHandler = upload("users", {
    width: 500,
    height: 500,
    crop: "limit"
  }).single("file");
  imageHandler(req, res, err => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else if (!req.file) {
      res.status(400).json({ message: "file is not set" });
    } else {
      new User({ id: req.user.data.id, image: req.file.secure_url })
        .update()
        .catch(e => res.status(400).json({ message: e.message }));
      res.status(201).json({ url: req.file.secure_url });
    }
  });
  return res;
});

module.exports = router;
