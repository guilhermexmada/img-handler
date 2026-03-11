import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize' // padrão moderno p/ tipagem dos dados

// criando molde da tabela
const Image = sequelize.define('Image', {
    id: { // uploadId em formato UUID é melhor para segurança do código
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    file_path: { // caminho do arquivo deve ser único
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mime_type: { // + 1 verificação do mime type
        type: DataTypes.ENUM(
            'image/jpeg',
            'image/jpg',
            'image/png'
        ),
        allowNull: false,
    },
    size: { // validate evita baixar imagens com tamanho 0
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