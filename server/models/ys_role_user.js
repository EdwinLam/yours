/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_role_user', {
    roleCode: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    userCode: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    tableName: 'ys_role_user'
  });
};
