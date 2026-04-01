import { showNotification } from "./notifications.js";

const imageInput = document.getElementById('image')

/** Envia arquivo de imagem para upload de forma assíncrona
 * @param {File} file
 */

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await fetch('/upload/', {
            method: 'POST',
            body: formData,
        })

        const data = await response.json() 

        if(response.ok){
            showNotification(data.message, 'success')
            console.log(`Status: ${response.status} \n${data.message}\n${JSON.stringify(data.result)}`)
        } else{
            showNotification('Erro ao salvar imagem', 'error')
            console.log(data.message || 'Erro ao fazer upload')
        }
    } catch (error) {
        alert('Erro ao salvar imagem')
        console.error('Falha na requisição:', error);
    }
}

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if(file){
        uploadImage(file)
    }
})