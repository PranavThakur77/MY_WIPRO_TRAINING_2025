module.exports = (sequelize, DataTypes) => {
    const Instructor = sequelize.define('Instructor', {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
    Instructor.associate = (models) => {
        Instructor.hasMany(models.Course, { foreignKey: 'instructorId' });
    };
    return Instructor;
};
