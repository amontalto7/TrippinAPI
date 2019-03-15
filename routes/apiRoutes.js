module.exports= function(router){
// REQUIRE AXIOS FOR API CALLS
// var axios = require("axios");  
const phrase_controller = require("../controllers/phraseController");
// const checklist_controller = require("../controllers/checklistController");

  router.get("/api/phrases", phrase_controller.phrase_list_get);
  // http://localhost:3001/api/phrases
  
  router.get("/api/populate_phrases", phrase_controller.populate_default_phrases);
  // http://localhost:3001/api/populate_phrases


  
  //   router.get("/api/checklist", phrase_controller.checklist_get)
}
