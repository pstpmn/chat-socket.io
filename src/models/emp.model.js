module.exports = (sequelize, DataTypes) => {
    const emp = sequelize.define("employees", {
        emp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emp_user: {
            type: DataTypes.STRING
        },
        emp_pass: {
            type: DataTypes.STRING
        },
        emp_name: {
            type: DataTypes.STRING
        },
        emp_department: {
            type: DataTypes.STRING
        },
        emp_position: {
            type: DataTypes.STRING
        }

    })

    // emp.associate = (models) => {
    //     // associations can be defined here
    //     console.log(models);
    //     emp.hasOne(models.posts, { foreignKey: 'emp_id' });
    // };

    return emp;
}