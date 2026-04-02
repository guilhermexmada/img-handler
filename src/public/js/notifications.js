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
        toast.addEventListener('animationend', () => {toast.remove()})
    }, 3000)
}