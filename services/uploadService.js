import { Upload } from '../models/index.js'
import { fileExists } from '../utils/storage.js'
import path from 'path'

class UploadService {

    async processUpload(data) {

        if (!data) {
            throw new Error('Arquivo não enviado')
        }

        const new_image = await Upload.create(data)

        return {
            success: true,
            message: 'Upload realizado com sucesso',
            new_image
        }
    }

    async getAll() {
        try {
            const saved_images = await Upload.findAll({
                order: [['createdAt', 'DESC']]
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

            return {
                success: true,
                message: 'Imagens encontradas com sucesso',
                result
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id) {
        try {
            const saved_image = await Upload.findByPk(id)

            if(!saved_image){ 
                throw new Error('Imagem não encontrada.')
            }

            const verify = async () => { 
                const exists = await fileExists(saved_image.file_path)
                return {
                    saved_image,
                    exists_in_storage : exists
                }
            }

            const result = await verify() 

            return {
                sucess: true,
                message: 'Imagem encontrada com sucesso',
                result
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export default new UploadService()