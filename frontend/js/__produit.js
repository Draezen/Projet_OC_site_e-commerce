
//récupération des infos de l'ourson
const recupererProduit = (url) => {
    const response = new Requete(url).requete();
    response.then (status => {
        if (status === 500){
            throw new Error("error")
        }
    })
    .catch((e) =>{
        //si URL incomplet (id non valide ou manquant)
        messageErreur("main", "urlInvalid", "<h1>URL invalide !</h1> <h2>Veuillez réessayer avec un autre ourson !</h2>")
    })
    return response
}

//affichage de l'ourson selectionné
const afficherProduit = () =>{
    
    const params = (new URL(document.location)).searchParams;
    const id = params.get("id")
    const urlTeddies = "http://localhost:3000/api/teddies";
    const urlTeddy = urlTeddies + "/" + id;

    addLoader("#teddyContainer", "loader")

    //affichage de l'ourson sur la page produit
    recupererProduit(urlTeddy).then (infosProduit => {
        if(infosProduit.name === "TypeError"){
            //si serveur down
            messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
        } else {
        // remplissage de la page produit
        creerProduit(infosProduit, "teddy");
        }
    })
}


afficherProduit()