const SewerMainTrunkController = require("./SewerMainTrunk.controller");

exports.SewerMainTrunkRoute = function (app) {
    app.get("/SewerMainTrunk/getall", [SewerMainTrunkController.getAllSewerMainTrunkController]);
};