const openModalBtn = document.getElementById("open-modal");
const closeModalBrn = document.getElementById("close-modal");
const modal = document.getElementById("modal");

openModalBtn.onclick = () => (modal.classList.add("visible"));
closeModalBrn.onclick = () => (modal.classList.add("hide"));
