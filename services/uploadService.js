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
                order: [['createdAt', 'DESC']] // ordena decrescente pela data de gravação
            })

            // para cada imagem encontrada, executa uma verificação da integridade no storage
            const result = await Promise.all(
                // espera promisse para cada elemento
                saved_images.map(async (image) => { // usa map() ao invés de forEach() pq foreach não espera promisess

                    const exists = await fileExists(image.file_path) // chama função de verificação em storage.js (espera booleano)

                    // para cada, retorna os dados salvos no banco + se está na storage ou não
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