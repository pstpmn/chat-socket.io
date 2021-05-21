
const models = require('../models/model');
const emp = require('../models/model').emp;


exports.setAddPost = async (req, res) => {
    try {
        var auth = jwt.verify(req.headers['token'], 'Kang');
        console.log(auth);
        await models.posts.create({
            post_topic: req.body.topic,
            post_content: req.body.content,
            emp_id: auth.id
        });
        return res.status(201).end();
    } catch (e) {
        return res.status(400).json({ meg: 'ข้อมูลผิดพลาด' })
    }
};



exports.getPosts = async (req, res) => {
    try {
        posts = await models.posts.findAll({
            attributes: ['post_id', 'post_topic', 'post_content', 'emp_id', 'createdAt'],
            include: [{
                attributes: ['emp_id', 'emp_user', 'emp_name'],
                model: models.emp
            }],
        })
        return res.status(200).json({ posts: posts }).end();
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }


    // try{
    //     await postsModel.findAll();
    //     return res.status(200).json({
    //         posts:postsModel
    //     }).end();
    // }catch(e){
    //     return res.status(400).json({meg:'ข้อมูลผิดพลาด'})
    // }
};

exports.topicPage = async (req, res) => {
    // res.send(req.params.topicId);
    let topicId = parseInt(req.params.topicId);
    if (isNaN(topicId)) return res.status(404).end();

    let post = await models.posts.findAll({
        where: { post_id: topicId },
        attributes: ['post_id', 'post_topic', 'post_content', 'createdAt'],
        include: [{
            attributes: ['emp_id', 'emp_user', 'emp_name'],
            model: models.emp
        }],
        limit: 1
    });
    if (post.length === 0) return res.status(404).end();

    let comments = await models.comments.findAll({
        where: { post_id: topicId },
        attributes: ['comment_id', 'comment_content', 'createdAt'],
        include: [{
            attributes: ['emp_id', 'emp_user', 'emp_name'],
            model: models.emp
        }],
    })

    return res.status(200).json({ post: post, comments: comments });
};


exports.setAddComment = async (req, res) => {
    try {
        var auth = jwt.verify(req.headers['token'], 'Kang');
        await models.comments.create({
            comment_content: req.body.comment,
            post_id: req.body.post,
            emp_id: auth.id
        });
        return res.status(201).end();
    } catch (e) {
        return res.status(400).json({ meg: 'ไม่สามารถเพิ่มข้อมูลได้' })
    }
};


exports.setDelComment = async (req, res) => {
    try {
        var auth = jwt.verify(req.headers['token'], 'Kang');
        let comment = await models.comments.findAll({
            where: { comment_id: req.body.comment_id },
            limit: 1
        });

        if (comment[0].emp_id != auth.id) {
            if (comment[0].emp_id !== auth.id) {
                return res.status(400).json({ meg: 'พบว่าข้อมูลไม่ตรงคุณไม่ใช้เจ้าของ comment นี้ !!' })
            }
        }
        await models.comments.destroy({
            where: {
                comment_id: req.body.comment_id,
                emp_id: auth.id
            }
        });
        return res.status(201).end();
    } catch (e) {
        return res.status(400).json({ meg: 'เกิดข้อผิดพลาดกับข้อมูลที่ส่งเข้ามา' })
    }
};


exports.setDelPost = async (req, res) => {
    console.log('asd');
    try {
        var auth = jwt.verify(req.headers['token'], 'Kang');
        let post = await models.posts.findAll({
            where: { post_id: req.body.post_id },
            limit: 1
        });

        if (post[0].emp_id != auth.id)return res.status(400).json({ meg: 'พบว่าข้อมูลไม่ตรงคุณไม่ใช้เจ้าของ Post นี้ !!' })

        await models.comments.destroy({
            where: {
                post_id: req.body.post_id,
                emp_id: auth.id
            }
        });

        await models.posts.destroy({
            where: {
                post_id: req.body.post_id,
                emp_id: auth.id
            }
        });
        return res.status(201).end();
    } catch (e) {
        return res.status(400).json({ meg: 'เกิดข้อผิดพลาดกับข้อมูลที่ส่งเข้ามา' })
    }
};
