'use strict'

const { STRING, UUID } = require('sequelize');

const SongsModel = {
    
    // this should be a UUID, which is a randomly generated ID
    id: {
        // determines data tye
        type: UUID,
        // creates no null constraint
        allowNull: false,
        // determines that this is the primary key of the table
        primaryKey: true,
        // sets the default value of this column
        defaultValue: UUID
    },
    artist: {
        type: STRING(50),
        allowNull: false,
    },
    album: {        
        type: STRING(50),
        allowNull: false,
    },
    song: {        
        type: STRING(50),
        allowNull: false,
    }
}

module.exports = SongsModel;