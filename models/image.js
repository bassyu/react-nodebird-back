module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    // id
    src: {
      type: DataTypes.STRING(200),
      allowNULL: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
