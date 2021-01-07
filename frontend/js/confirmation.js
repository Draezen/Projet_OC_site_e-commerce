window.addEventListener("load", function () {
    const params = (new URL(document.location)).searchParams;
    const id = params.get("id")
    const price = params.get("price")
    afficherValidationCommande(id, price)
})