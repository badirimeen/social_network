const { Sequelize, DataTypes } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/types/query-types');

const sequelize = new Sequelize('social_network', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


const User = sequelize.define('user', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  first_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  last_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  photo_id: {
      type: DataTypes.INTEGER,
    allowNull: true
  },
  birthday: {
      type: DataTypes.DATE,
    allowNull: true
  },
  country: {
      type: DataTypes.STRING,
    allowNull:true
  },
  city: {
      type: DataTypes.STRING,
    allowNull:true
  },
  gender: {
      type: DataTypes.ENUM(['male', 'female']),
    allowNull:true
  },
  balance: {
      type: DataTypes.FLOAT,
    allowNull:true,
    defaultValue: 0
  },
}, {
  tableName: 'users',
  timestamps: false
});





const Posts = sequelize.define('posts', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  
}, {
  tableName: 'posts',
  timestamps: false
});




const Like = sequelize.define('like', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
      type: DataTypes.DATE,
      allowNull: false
  },
  updated_at: {
      type: DataTypes.DATE,
      allowNull: false
  },
  
}, {
  tableName: 'likes',
  timestamps: false
});


User.belongsToMany(Like, {through: Posts});
Like.belongsToMany(User, {through: Posts});






;(async () => {
  try {
    await User.sync({ 
      alter: true,
      force: false});
      
    await Posts.sync({ 
        alter: true,
        force: false});

    await Like.sync({ 
      alter: true,
      force: false});

      User.findOne({where: {first_name: "Bob"}})
      .then(user=>{
          if(!user) return;
          user.getPostes().then(postes=>{
              for(posts of postes){
                  console.log(posts.title);
              }
          });
      });
  }
  catch (error) {
      console.error(error);
  }
})();