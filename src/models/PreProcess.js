import sequelize from "../config/database.js"
import { DataTypes } from "sequelize"

const PreProcess = sequelize.define("PreProcess", {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  
  original_image_id: { 
    type: DataTypes.UUID,
    allowNull: false
  },

  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  format: {
    type: DataTypes.STRING,
    allowNull: false
  },

  width: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  height: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  size: {
    type: DataTypes.STRING,
    allowNull: false
  },

  operations:{ 
    type: DataTypes.JSON,
    allowNull: false,
  },

  operations_hash:{ 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  
  mode: {
    type: DataTypes.ENUM('display','ml'),
    defaultValue: 'display'
  }

}, {
  tableName: "preprocess_images",
  timestamps: true
})

export default PreProcess