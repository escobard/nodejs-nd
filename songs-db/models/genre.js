'use-strict'

const { UUID, STRING, UUIDV4 } = require('sequelize');

const GenreModel = {
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING(50),
        allowNull: false
    }
}