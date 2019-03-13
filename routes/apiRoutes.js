const express = require ("express");
const router = express.Router(); 

// REQUIRE AXIOS FOR API CALLS
// var axios = require("axios");  
const phrase_controller = require("../controllers/phraseController");
// const checklist_controller = require("../controllers/checklistController");

  router.get("/api/phrases", phrase_controller.phrase_list_get);
  //   router.get("/api/checklist", phrase_controller.checklist_get)

module.exports = router;