class UploadService{
    
    async processUpload(file){
        
        if(!file){
            throw new Error('Arquivo não enviado') 
        }
        
        return{
            message: 'Upload realizado com sucesso',
            filename: file.filename,
            size: file.size,
            path: file.path
        }
    }
}

export default new UploadService()