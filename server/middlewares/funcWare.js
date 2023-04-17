const md5 = require("md5");
const adminModel = require("../models/adminModel")

module.exports = {
    setDefaultSettings: async()=>{
        const $admin = await adminModel.findOne({login: process.env.ADMIN_LOGIN});
        if(!$admin){
            new adminModel({
                login: process.env.ADMIN_LOGIN,
                password: md5(process.env.ADMIN_PASSWORD)
            }).save();
        }
    }
}