/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ys_node', {
    id: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sort: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'ys_node'
  });
};
