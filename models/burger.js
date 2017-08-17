
module.exports = function(sequelize, DataTypes) {
  //define db table
  var burgers = sequelize.define("burgers", {
    burger_name: {
      type: DataTypes.STRING,
      // validation: null (blank) values not allowed
      allowNull: false,
      // validation: must have a length between 1 - 140
      validate: {
        len: [1, 140]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }//,
    //date:{
    //  type: DataTypes.NOW
   // }
  });
  return burgers;
};
