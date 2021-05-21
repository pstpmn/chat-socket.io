module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts", {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_topic: {
            type: DataTypes.STRING
        },
        post_content: {
            type: DataTypes.STRING
        },
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'emp_id'
            }
        }
    })

    // posts.associate = (models) => {
    //     // associations can be defined here
    //     console.log('asd');
    //     posts.belongsToMany(models.employees, { foreignKey: 'emp_id', });
    // };

    return posts;
}