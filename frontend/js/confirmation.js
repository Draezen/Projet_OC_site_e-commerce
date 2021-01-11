
const afficherConfirmation = () => {
    if (localStorage.getItem("commande") !== null){
        afficherValidationCommande()
        localStorage.clear()
    } else {
        window.location.href = "./index.html"
    }
}

window.addEventListener("load", afficherConfirmation)
