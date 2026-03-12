import { Upload } from '../models/index.js'
import { fileExists } from '../storage.js'
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
}

export default new UploadService()