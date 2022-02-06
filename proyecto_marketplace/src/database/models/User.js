module.exports = (sequelize, DataTypes) => {

    let alias = 'Users';

    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'users',        
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config)

    //Movie.associate = (models) => {
//
    //    Movie.belongsTo(models.Genres, {
    //        as: "genre",
    //        foreignKey: "genre_id"
    //    });
//
    //    Movie.belongsToMany(models.Actors, {
    //        as:"actors",
    //        through: "actor_movie",
    //        foreignKey: "movie_id",
    //        otherKey: "actor_id",
    //        timestamps: false
    //    })
//
    //}

    return User
}