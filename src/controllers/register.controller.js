const empModel = require('../models/model').emp;

exports.setRegis = async (req, res) => {
    try{
        await empModel.create({
            emp_user : req.body.username,
            emp_pass : req.body.password,
            emp_name : req.body.name,
            emp_department : req.body.department,
            emp_position : req.body.position
        });
        return res.status(201).end();
    }catch(e){
        return res.status(400).json({meg:'ข้อมูลผิดพลาด'})
    }
};