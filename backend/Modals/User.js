const mongoose = require("mongoose")

const userDataSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    phone: String,
    email: String,
    password: String,
    role: String,
})
const userDataModel = mongoose.model("user", userDataSchema)

module.exports=userDataModel


