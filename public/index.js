window.addEventListener('DOMContentLoaded', (event) => {
    const popoverTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'))
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
        trigger: 'focus',
    }))
    console.log(popoverList)
    console.log(popoverTriggerList)
})
