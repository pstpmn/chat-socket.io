var { check, validationResult } = require('express-validator');
const empModel = require('../models/model').emp;
exports.IndexPage = (req, res) => {
    res.send(' Hello World')
};

exports.loginAuth = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('โปรดพิมพ์ Username ของคุณ !!'),
    check('password')
        .trim()
        .escape()
        .not().isEmpty()
        .withMessage('โปรดพิมพ์ Password ของคุณ !!'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() }).end();
        }
        await empModel.findAll({
            where: { emp_user: req.body.username }, limit: 1
        })
            .then(result => {
                if (result.length === 0) return res.status(401).json({ msg: "not found Username & password" }).end();
                if (req.body.password != result[0].emp_pass) return res.status(401).json({ msg: "password invalid !!" }).end();

                console.log(req.session.id)
                var token = jwt.sign({
                    id: result[0].emp_id,
                    username: result[0].emp_user,
                }, 'Kang', { expiresIn: 60*60 });
                console.log("generated token : "+token);
                return res.status(200).json({
                    token: token,
                    username:result[0].emp_user
                }).end();

            }).catch(err => { res.status(401).end() });
    }
];


    // if(req.body.length === 0)return res.send('No username and password !!');
    // else return res.send('had username')+
