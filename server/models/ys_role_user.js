/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_role_user', {
    roleId: {
      type: DataTypes.INTEGER(9),
      allowNull: true
    },
    userId: {
      type: DataTypes.CHAR(32),
      allowNull: true
    }
  }, {
    tableName: 'ys_role_user'
  });
};
