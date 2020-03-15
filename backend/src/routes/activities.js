const express = require("express");
const passport = require("passport");
const Activity = require("../models/Activity");
const APIError = require("../utils/APIError.js");
const authenticate = require("../middleware/localAuth");

const router = express.Router();

router.get("/", (req, res) => {
  const activity = new Activity(req.query);
  activity
    .read()
    .then(data => {
      res.json({ activities: data });
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.post("/", passport.authenticate("jwt"), (req, res) => {
  const activity = new Activity(req.body);
  activity
    .create()
    .then(([data]) => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  const activity = new Activity({ id: req.params.id });
  activity
    .read()
    .then(([data]) => {
      if (data === undefined) {
        throw new APIError(`activity #${req.params.id} not found`, 404);
      }
      res.json(data);
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.delete("/:id", passport.authenticate("jwt"), (req, res) => {
  const activity = new Activity({ id: req.params.id });
  activity
    .delete()
    .then(() => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

router.put("/:id", passport.authenticate("jwt"), (req, res) => {
  const { id, ...newData } = req.body;
  const activity = new Activity({ id: req.params.id, ...newData });
  activity
    .update()
    .then(() => {
      res.json();
    })
    .catch(err => {
      res.status(err.statusCode || 400).json({ message: err.message });
    });
});

module.exports = router;
