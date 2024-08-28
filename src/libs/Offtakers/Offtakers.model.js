const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Offtake = require("../../models/Offtakers")(sequelize, Sequelize);

Offtake.sync({ force: false });

exports.createOfftake = async (OfftakeData) => {
    try {
        if (!OfftakeData.ObjectID) {
            throw new Error("Body is required!");
        }
        await Offtake.create(OfftakeData);
        return { success: "Offtake created successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Creation failed");
    }
};

exports.updateOfftakeByID = async (OfftakeData, id) => {
    try {
        const affectedRows = await Offtake.update(OfftakeData, {
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

exports.getAllOfftake = async () => {
    try {
        const result = await Offtake.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve off-takes");
    }
};
exports.deleteOfftakeByID = async (id) => {
    try {
        const affectedRows = await Offtake.destroy({
            where: { ID: id }
        });
        return affectedRows;
    } catch (error) {
        console.error(error);
        throw new Error("Deletion failed");
    }
};
