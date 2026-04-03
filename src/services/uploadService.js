import { Upload } from '../models/index.js'
import { fileExists, deleteFile } from '../utils/storage.js' // importando utilitário para apagar arquivo da storage
import AppError from '../utils/appError.js'
import path from 'path'

class UploadService {

    async processUpload(data) {

        if (!data) {
            throw new AppError('Erro ao baixar imagem', 500) 
        }

        try {
            const new_image = await Upload.create(data)
            return new_image
        } catch (error) {
            throw new AppError('Erro ao salvar imagem', 500) 
        }
    }

    async getAll() {
        try {
            const saved_images = await Upload.findAll({
                order: [['createdAt', 'DESC']],
                raw: true // consulta apenas os dados do registro, ignora outros métodos da instância sequelize
            })

            const result = await Promise.all(

                saved_images.map(async (image) => {

                    const exists = await fileExists(image.file_path)

                    return {
                        image,
                        exists_in_storage: exists,
                    }
                })
            )

            return result

        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id) {
        try {
            const saved_image = await Upload.findByPk(id)

            if(!saved_image){ 
                throw new AppError('Imagem não encontrada', 404) 
            }

            const verify = async () => { 
                const exists = await fileExists(saved_image.file_path)
                return {
                    saved_image,
                    exists_in_storage : exists
                }
            }

            const result = await verify() 

            return result

        } catch (error) {
            console.log(error)
        }
    }

    async deleteOne(id){
        try {
            const imageToDelete = await Upload.findByPk(id)

            if(!imageToDelete){
                throw new AppError('Imagem não encontrada', 404)
            }

            const exists = await fileExists(imageToDelete.file_path)

            // se arquivo existir na storage, apaga
            if(exists){
                await deleteFile(path)
            }

            // deleta registro no banco de dados
            await Upload.destroy({
                where: { id: id}
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export default new UploadService()