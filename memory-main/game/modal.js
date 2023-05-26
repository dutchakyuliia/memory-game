const openModalBtn = document.getElementById("open-modal");
const closeModalBrn = document.getElementById("close-modal");
const modal = document.getElementById("modal");

openModalBtn.addEventListener('click', toggleModal) 
closeModalBrn.addEventListener('click', toggleModal)

function toggleModal (){
    modal.classList.toggle("is-hidden")
}