/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_access', {
    roleId: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    nodeId: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    moudle: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'ys_access'
  });
};
