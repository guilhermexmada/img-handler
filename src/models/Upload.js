import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize' 

const Image = sequelize.define('Image', {
    id: { 
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    file_path: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mime_type: { 
        type: DataTypes.ENUM(
            'image/jpeg',
            'image/jpg',
            'image/png'
        ),
        allowNull: false,
    },
    size: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min: 1
        }
    },
    original_name:{
        type: DataTypes.STRING
    },
    extension:{
        type: DataTypes.STRING
    }
},
    {
        tableName: 'images',
        timestamps: true
    }
)

export default Image