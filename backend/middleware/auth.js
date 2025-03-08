require('dotenv').config();
var jwt = require('jsonwebtoken')
JWT_SECRET = process.env.JWT_SECRET

const userDataModel = require('../Modals/User');

const Authenticated = async (req, res, next) => {
    try {
        const token = req.cookies._xz;
        if (!token) return res.status(401).json({ message: "Please Login to Continue!", success: false });

        const decoded = jwt.verify(token, JWT_SECRET);
        const id = decoded.userId;

        let user = await userDataModel.findById(id).select('-password');
        if (!user) return res.status(401).json({ message: "User not found", success: false });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication Error. Contact admin", success: false });
    }
};

module.exports = Authenticated;