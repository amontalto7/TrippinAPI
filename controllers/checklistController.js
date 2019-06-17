const Checklist = require("../models/Checklist");

// Get all checklist items
exports.checklist_get = function(req, res) {
  Checklist.find()
    .then(dbChecklist => res.json(dbChecklist))
    .catch(err => res.json(err));
};

// Update a checklist item
exports.checkitem_toggle = function(req, res) {
  // req.body.checked is getting passed by the client in the ajax call
  Checklist.findOneAndUpdate(
    { _id: req.params.id },
    { checked: req.body.checked }
  )
    .then(dbChecklistItem => res.json(dbChecklistItem))
    .catch(err => res.json(err));
};
