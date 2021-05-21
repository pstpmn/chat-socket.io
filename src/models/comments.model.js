module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("comments", {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_content: {
            type: DataTypes.STRING
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'post_id'
            }
        },
        emp_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employees',
                key: 'emp_id'
            }
        }
    })

    return comments;
}