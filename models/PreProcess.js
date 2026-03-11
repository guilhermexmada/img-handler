import sequelize from "../config/database.js"
import { DataTypes } from "sequelize"

// cria molde básico para tabela PreProcess, evitando quebrar relacionamento das models
const PreProcess = sequelize.define("PreProcess", {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  
  uploadId: { // campo para chave estrangeira (definida na model index)
    type: DataTypes.UUID,
    allowNull: false
  },

  file_path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  operations:{ // registra todas as operações feitas com sharp
    type: DataTypes.JSON
  }

}, {
  tableName: "preprocess_images",
  timestamps: true
})

export default PreProcess