/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nick: {
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
    }
  }, {
    tableName: 'ys_user'
  });
};
