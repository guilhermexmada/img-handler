/**
 * Exibe uma notificação Toast clean
 */
export const showNotification = (message, type) => {
    const toast = document.createElement('div') // cria notificação
    toast.className = `toast toast-${type}` // define a class baseada no argumento tipo de mensagem
    toast.textContent = message // exibe texto da response, o qual foi passado como argumento

    document.body.appendChild(toast) // insere a notificação no corpo do HTML

    // remove notificação após 3 segundos
    setTimeout(() => {
        toast.classList.add('fade-out')
        toast.addEventListener('animationend', () => {toast.remove()})
    }, 3000)
}