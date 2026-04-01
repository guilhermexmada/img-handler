const imageInput = document.getElementById('image')

// JSDOC (abaixo) deixa mensagem ao passar mouse por cima de função
/** Envia arquivo de imagem para upload de forma assíncrona
 * @param {File} file
 */

// função que envia arquivo para rota de upload
const uploadImage = async (file) => {
    // simula <form> usando objeto FormData
    const formData = new FormData();
    // adiciona um campo chamado 'image' que o Multer vai buscar
    formData.append('image', file);
    try {
        // fetch inicia comunicação com servidor, enviando o dado via POST
        const response = await fetch('/upload/', {
            method: 'POST',
            body: formData, // reconhece automático content-type = multipart/form-data
        })

        const data = await response.json() // aguarda resposta do servidor convertida pra JSON

        // verifica se a resposta está entre 200-299
        if(response.ok){
            alert('Imagem salva com sucesso!')
            console.log(`Status: ${response.status} \n${data.message}\n${JSON.stringify(data.result)}`)
        } else{
            console.log(data.message || 'Erro ao fazer upload')
        }
    } catch (error) {
        alert('Erro ao salvar imagem')
        console.error('Falha na requisição:', error);
    }
}

// função que dispara envio do arquivo assim que o usuário selecionar a imagem e fechar a janela do explorador
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if(file){
        uploadImage(file)
    }
})