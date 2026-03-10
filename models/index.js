// importar configuração sequelize
import sequelize from '../config/database.js'
// importar todas as models
import Upload from './Upload.js'
import PreProcess from './PreProcess.js'

// relacionamentos
// imagem original 1:1 <-> 0:n imagem pré-processada
Upload.hasMany(PreProcess, {
    foreignKey: 'uploadId',
    as: 'preProcess'
})

PreProcess.belongsTo(Upload, {
    foreignKey: 'uploadId',
    as: 'upload',
    onDelete: 'CASCADE'
})

export{
    sequelize,
    Upload,
    PreProcess
}
