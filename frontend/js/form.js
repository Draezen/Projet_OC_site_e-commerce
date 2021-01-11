//Validation d'un champ du formulaire
const verifChampValide = (champ, regex, help, id) => {
    let formHelp = "";
    const valide = verifRegexChamp(champ, regex)
    if (valide == false) {
        //si champs de saisi contient des caractères interdits
        formHelp = help;
        document.getElementById(id).classList.remove("valide")
    } else {
        //si saisie OK
        formHelp = "\u00A0";
        //validation du cahmps pour envoie
        document.getElementById(id).classList.add("valide")
        document.getElementById("formInvalid").textContent = formHelp
    }
    document.getElementById(id).textContent = formHelp;
}
