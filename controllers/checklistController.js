const Checklist = require("../models/Checklist");

// Get all checklist items
exports.checklist_get = function(req, res) {
  Checklist.find()
    //TODO - find().or([{default: true },{ userId: currentUser}])
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

// Add a checklist item
exports.checklist_add = function(req, res) {
  Checklist.create(req.body) // expecting {item: "itemName"}
    .then(dbItem => res.json(dbItem))
    .catch(err => res.json(err));
};
