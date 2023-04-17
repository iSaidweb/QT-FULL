const md5 = require("md5");
const adminModel = require("../models/adminModel");

module.exports = {
    signin:async (req, res) => {
        console.log(req.body);
        const { login, password } = req.body;
        if (!login || !password) {
            res.send({
                success: false,
                message: "Qatorlarni to'ldiring!"
            });
        } else {
            const $admin = await adminModel.findOne({login});
            if(!$admin){
                res.send({
                    success: false,
                    message: "Login hato kiritildi!"
                });
            } else if (md5(password) !== $admin.password) {
                res.send({
                    success: false,
                    message: "Parol hato kritildi!"
                });
            } else {
                const token = require('jsonwebtoken').sign( {adminId: $admin._id}, process.env.JWT_SECRET, { expiresIn: '3d' });
                $admin.set({secret_key: token}).save();
                res.send({
                    success: true,
                    message: "Barchasi to'g'ri!",
                    token
                });
            }
        }
    },
    check: (req,res)=>{
        res.send({
            success: true,
        });
    }
}