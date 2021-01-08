window.addEventListener("load", function () {
    if (localStorage.getItem("commande") !== null){
        afficherValidationCommande()
        localStorage.clear()
    } else {
        window.location.href = "./index.html"
    }
})