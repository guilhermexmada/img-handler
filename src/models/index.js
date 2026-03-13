import sequelize from '../config/database.js'

import Upload from './Upload.js'
import PreProcess from './PreProcess.js'

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
