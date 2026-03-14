import sequelize from "../config/database.js"
import { DataTypes } from "sequelize"

const PreProcess = sequelize.define("PreProcess", {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  
  uploadId: { 
    type: DataTypes.UUID,
    allowNull: false
  },

  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  operations:{ 
    type: DataTypes.JSON
  }

}, {
  tableName: "preprocess_images",
  timestamps: true
})

export default PreProcess