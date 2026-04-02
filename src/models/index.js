import sequelize from '../config/database.js'

import Upload from './Upload.js'
import PreProcess from './PreProcess.js'

Upload.hasMany(PreProcess, {
    foreignKey: 'original_image_id',
    as: 'preProcess'
})

PreProcess.belongsTo(Upload, {
    foreignKey: 'original_image_id',
    as: 'upload',
    onDelete: 'CASCADE'
})

export{
    sequelize,
    Upload,
    PreProcess
}
