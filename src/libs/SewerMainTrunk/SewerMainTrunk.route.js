
const SewerMainTrunkController = require("./SewerMainTrunk.controller");



exports.SewerMainTrunkRoute = function (app) {
    app.post("/SewerMainTrunk/create", SewerMainTrunkController.createSewerMainTrunk);

    app.put("/SewerMainTrunk/update/:id", SewerMainTrunkController.updateSewerMainTrunk);

    app.get("/SewerMainTrunk", SewerMainTrunkController.getAllSewerMainTrunkController); 

    app.delete("/SewerMainTrunk/delete/:id", SewerMainTrunkController.deleteSewerMainTrunk);
};
