const Checklist = require("../models/Checklist");

// Get all checklist items
exports.checklist_get = function(req, res) {
  Checklist.find()
    .then(dbChecklist => res.json(dbChecklist))
    .catch(err => res.json(err));
};
