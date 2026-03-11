import {Upload} from '../models/index.js'

class UploadService{
    
    async processUpload(data){ // aguarda resultado do multer middleware
        
        if(!data){
            throw new Error('Arquivo não enviado') 
        }

        // salva imagem no banco (já foi baixada pelo multer)
        const new_image = await Upload.create(data)
        
        return{
            success: true,
            message: 'Upload realizado com sucesso',
            new_image
        }
    }
}

export default new UploadService()