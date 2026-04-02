/**
 * Exibe uma notificação Toast clean
 */
export const showNotification = (message, type) => {
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    toast.textContent = message

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.classList.add('fade-out')
        toast.addEventListener('animationend', () => { toast.remove() })
        // após notificação sumir, recarrega página para exibir nova imagem
        if (type == 'success') {
            window.location.reload()
        }
    }, 3000)


}