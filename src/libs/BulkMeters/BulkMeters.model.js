const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const BulkMeters = require("../../models/BulkMeters")(sequelize, Sequelize);

BulkMeters.sync({ force: false });

exports.createBulkMeters = async (BulkMetersData) => {
    try {
        if (!BulkMetersData.ObjectID) {
            throw new Error("Body is required!");
        }
        await BulkMeters.create(BulkMetersData);
        return { success: "BulkMeters created successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Creation failed");
    }
};

exports.updateBulkMetersByID = async (BulkMetersData, id) => {
    try {
        const affectedRows = await BulkMeters.update(BulkMetersData, {
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

exports.getAllBulkMeters = async () => {
    try {
        const result = await BulkMeters.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve BulkMeters");
    }
};
exports.deleteBulkMetersByID = async (id) => {
    try {
        const affectedRows = await BulkMeters.destroy({
            where: { ID: id }
        });
        return affectedRows;
    } catch (error) {
        console.error(error);
        throw new Error("Deletion failed");
    }
};
