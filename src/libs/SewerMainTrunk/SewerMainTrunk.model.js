const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const SewerMainTrunk = require("../../models/SewerMainTrunk")(sequelize, Sequelize);

SewerMainTrunk.sync({ force: false });

exports.createSewerMainTrunk = async (SewerMainTrunkData) => {
    try {
        if (!SewerMainTrunkData.ObjectID) {
            throw new Error("Body is required!");
        }
        await SewerMainTrunk.create(SewerMainTrunkData);
        return { success: "SewerMainTrunk created successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Creation failed");
    }
};

exports.updateSewerMainTrunkByID = async (SewerMainTrunkData, id) => {
    try {
        const affectedRows = await Offtake.update(SewerMainTrunkData, {
            where: { ID: id }
        });
        console.log(affectedRows);
        
        if (affectedRows === 0) {
            throw new Error("Update failed. No rows affected.");
        }
        return { success: "Updated successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Update failed");
    }
};

exports.getAllSewerMainTrunk = async () => {
    try {
        const result = await SewerMainTrunk.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve SewerMainTrunk");
    }
};
exports.deleteSewerMainTrunkByID = async (id) => {
    try {
        const affectedRows = await SewerMainTrunk.destroy({
            where: { ID: id }
        });
        return affectedRows;
    } catch (error) {
        console.error(error);
        throw new Error("Deletion failed");
    }
};
