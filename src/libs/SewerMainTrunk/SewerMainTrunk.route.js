const SewerMainTrunkController = require("./SewerMainTrunk.controller");

exports.SewerMainTrunkRoute = function (app) {
    app.post("/sewertrunk/create", [SewerMainTrunkController.createSewerTrunk]);

    app.get("/sewertrunks", [SewerMainTrunkController.getAllSewerMainTrunks]);
};