const adminModel = require('../models/adminModel');
module.exports = (req, res, next) => {
    const authToken=req.headers['x-auth-token'];
    if(!authToken.startsWith('Bearer ')){
        res.send({
            success: false,
            message: "Avtorizatsiyada hatolik!"
        })
    }else{
        const token = authToken.replace('Bearer ','');
        require('jsonwebtoken').verify(token, process.env.JWT_SECRET,async (err, data)=>{
            if(err){
                res.send({
                    success: false,
                    message: "Sessiya vaqti yakunlangan!"
                });
            }else{
                const {adminId}=data;
                const $admin = await adminModel.findOne({_id: adminId});
                if(!$admin){
                    res.send({
                        success: false,
                        message: "Hatolik! Admin topilmadi!"
                    });
                }else if(token !== $admin.secret_key){
                    res.send({
                        success: false,
                        message: "Hatolik! Ushbu qurulmada sessiya yakunlangan!"
                    });
                }else{
                    req.admin = {adminId, login: $admin.login};
                    next();
                }
            }
        })
    }
}