import { showNotification } from "./notifications.js"

window.deleteImage = async (id) => {
    const formData = new FormData()
    formData.append('id', id)
    try {
        const response = await fetch(`/upload/${id}`, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()
        console.log("Resposta do servidor:", data);

        if (data.success === true) {
            showNotification(data.message, 'success')
            console.log(`Status: ${response.status} \n${data.message}`)
        } else {
            showNotification(data.message || 'Erro ao excluir imagem', 'error')
        }
    } catch (error) {
        alert('Erro ao deletar imagem')
        console.error('Falha na requisição: ', error)
    }
}