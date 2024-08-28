const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const ConnectionChamber = require("../../models/ConnectionChamber")(sequelize, Sequelize);

ConnectionChamber.sync({ force: false });

exports.createConnectionChamber = async (ConnectionChamberData) => {
    try {
        if (!ConnectionChamberData.ObjectID) {
            throw new Error("Body is required!");
        }
        await ConnectionChamber.create(ConnectionChamberData);
        return { success: "ConnectionChamber created successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Creation failed");
    }
};

exports.updateConnectionChamberByID = async (ConnectionChamberData, id) => {
    try {
        const affectedRows = await ConnectionChamber.update(ConnectionChamberData, {
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

exports.getAllConnectionChamber = async () => {
    try {
        const result = await ConnectionChamber.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve ConnectionChamber");
    }
};
exports.deleteConnectionChamberByID = async (id) => {
    try {
        const affectedRows = await ConnectionChamber.destroy({
            where: { ID: id }
        });
        return affectedRows;
    } catch (error) {
        console.error(error);
        throw new Error("Deletion failed");
    }
};
