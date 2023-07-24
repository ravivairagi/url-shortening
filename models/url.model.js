module.exports = (sequelize, DataTypes) => {
    const Url = sequelize.define('urls', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        longUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shortUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    });

    return Url;
  };