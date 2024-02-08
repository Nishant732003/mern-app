const Service = require("../models/serviceModel");
const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(400).json({ msg: "No Services Found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`service ${error}`);
    }
}

module.exports = services;