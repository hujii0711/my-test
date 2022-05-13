const User = require('../../models/user');

exports.dbSelect = async (res) => {
    console.log("userCtrl >>>>> dbSelect====");
    try {
        const users = await User.findAll();
        console.log("users=====", users);
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.dbInsert = (param) => {
    console.log("userCtrl >>>>> dbInsert====", param);
};

exports.dbUpdate = (param) => {
    console.log("userCtrl >>>>> dbUpdate====", param);
};

exports.dbDelete = (param) => {
    console.log("userCtrl >>>>> dbDelete====", param);
};
