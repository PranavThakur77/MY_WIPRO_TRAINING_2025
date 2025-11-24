module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT }
    });
    Course.associate = (models) => {
        Course.belongsTo(models.Instructor, { foreignKey: 'instructorId' });
    };
    return Course;
};
