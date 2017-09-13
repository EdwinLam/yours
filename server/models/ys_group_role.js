/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_group_role', {
    groupCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roleCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ys_group_role'
  });
};
