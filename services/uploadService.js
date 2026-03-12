import {Upload} from '../models/index.js'

class UploadService{
    
    async processUpload(data){ 
        
        if(!data){
            throw new Error('Arquivo não enviado') 
        }

        const new_image = await Upload.create(data)
        
        return{
            success: true,
            message: 'Upload realizado com sucesso',
            new_image
        }
    }
}

export default new UploadService()