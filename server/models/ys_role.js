/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_role', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'ys_role'
  });
};
