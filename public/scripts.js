const cards = document.querySelectorAll('.card')
const modalOverlay = document.querySelector('.modal-overlay')


for(let card of cards){
    card.addEventListener('click',()=>{
        const cardId = card.getAttribute('id')
        window.location.href=`/courses/${cardId}`
    })
}

document.querySelector('.close-modal').addEventListener('click',()=>{
    modalOverlay.classList.remove('visible')
    modalOverlay.classList.remove('modal-full-page')
})

document.querySelector('.full-modal').addEventListener('click',()=>{
    modalOverlay.classList.toggle('modal-full-page')
})