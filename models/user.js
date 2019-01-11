'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid e-mail address.'
        }  
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 20],
          msg: 'Your password must be between 8 and 20 characters long.'
        }
      }
    },
    username: DataTypes.STRING,
    dob: DataTypes.DATE,
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN,
    image: {
      type: DataTypes.TEXT, 
      validate: {
        isUrl: {
          msg: 'Please submit a picture.'
        }
      }

    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser){
        if(pendingUser) {
          var hash = bcrypt.hashSync(pendingUser.password, 12); // second arg = salt length. default is ten
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  user.prototype.validPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  }
  return user;
};



