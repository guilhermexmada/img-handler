// alert('oi')

const imageInput = document.getElementById('image')

imageInput.addEventListener('change', () => {
    // se selecionar uma imagem
    if (imageInput.files.length > 0) {
        // simula <form> usando objeto FormData
        const formData = new FormData();
        // adiciona um campo chamado 'image' que o Multer vai buscar
        formData.append('image', imageInput.files[0]);

        // fetch inicia comunicação com servidor, enviando o dado via POST
        fetch('/upload/', {
            method: 'POST',
            body: formData, // reconhece automático content-type = multipart/form-data
        })
            .then(response => response.json()) // converte a resposta do servidor p/ JSON
            .then(data => console.log('Sucesso:', data))
            .catch(error => console.error('Erro:', error));
    }
})