const models = require('../models/model');

exports.profilePage = async (req, res) => {
    console.log("Open profile ");
    var result;
    var emp;
    try {
        result = jwt.verify(req.headers['token'], 'Kang');
        emp = await models.emp.findAll({ where: { emp_id: result.id }, limit: 1 })
        // console.log(emp[0].dataValues)
        return res.status(200).json({ emp: emp[0].dataValues }).end()
        // emp.then(() => {
        //     console.log(emp);
        //     res.status(200).json({ emp: emp[0] }).end()
        // }).catch(() => { res.status(401).end(); })

    } catch (e) {
        console.log(e);
        return res.status(401).end();
    }
};


exports.mainPage = async (req, res) => {
    try {
        emp = await models.emp.findAll({
            attributes: ['emp_user', 'emp_name','emp_department','emp_position']
        })
        return res.status(201).json({ emp: emp }).end();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }


};