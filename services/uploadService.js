class UploadService{
    // 
    async processUpload(file){
        // se faltar o parâmetro, retorna um erro p/ controller
        if(!file){
            throw new Error('Arquivo não enviado') 
        }
        // retorna dados do arquivo
        return{
            message: 'Upload realizado com sucesso',
            filename: file.filename,
            size: file.size,
            path: file.path
        }
    }
}

export default new UploadService()