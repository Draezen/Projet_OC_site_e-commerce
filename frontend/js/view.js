class View {
    constructor() {}

    creerElement(tag, className, id, textContent, href, src){
        const element = document.createElement(tag)
        element.tag = tag;
        if (className) element.className = className;
        if (id) element.id = id;
        element.textContent = textContent;
        element.href = href;
        element.src = src;
        return element
    }

    supprimerElement(selecteur){
        selecteur.remove()
    }

    selectionnerElement(selecteur){
        return document.querySelector(selecteur) 
    }

    creerListeProduit = (listeProduits, produits) => {

        //suppression de loader
        this.removeLoader("#loader", produits)
    
        //récupération du container
        //const productsElt = document.getElementById(`${produits}Container`);
        const productsElt = this.selectionnerElement(`#${produits}Container`)
        //création des éléments
        listeProduits.forEach(produit => {
    
            // création des cartes
            const productElt = this.creerElement("article", `${produits}__card`)
            const productLink = this.creerElement("a", `${produits}__link`, "", "", "produit.html?id=" + produit._id)
            const productImage = this.creerElement("img", `${produits}__image`, "", "", "", produit.imageUrl)
            const productName = this.creerElement("h2", `${produits}__name`, "", produit.name)
            const productPrice = this.creerElement("p", `${produits}__price`, "", prix(produit.price / 100))
    
            //ajout dans le DOM
            productElt.appendChild(productLink);
            productLink.append(productImage, productName, productPrice);
            productsElt.appendChild(productElt);
    
            
        });
    }

    creerProduit = (infosProduit, produit, panier) => {

        //suppression du loader
        this.removeLoader("#loader", produit)
    
        //récupération du container
        const productElt = this.selectionnerElement(`#${produit}Container`);
    
        //création des éléments
    
        //Image ourson
        //création des éléments
        const columnOneELt = this.creerElement("div", `${produit}__column-one`)
        const teddyImageElt = this.creerElement("img", "teddy__image", "", "", "", infosProduit.imageUrl)
        teddyImageElt.alt = "photo d'un ourson"
    
        //ajout dans le DOM
        columnOneELt.appendChild(teddyImageElt)
        
        //Description
        //création des éléments
        const columnTwoELt = this.creerElement("div", `${produit}__column-two`)
        const productNameElt = this.creerElement("h2", `${produit}__name`, "", infosProduit.name )
        const productAboutElt = this.creerElement("p", `${produit}__about`, "", infosProduit.description)
        const productColorElt = this.creerElement("form", `${produit}__color`, `${produit}Form`)
        const labelFormElt = this.creerElement("label", "", "Couleurs : ")
        labelFormElt.setAttribute ("for", `${produit}Color`)
        const selectFormElt = this.creerElement("select", "", `${produit}Color`)
        selectFormElt.name = "color"
        
        //remplissage de la selection des couleurs
        for (let color of infosProduit.colors) {
            const optionElt = this.creerElement("option", "", "", color);
            optionElt.value = color;
            selectFormElt.appendChild(optionElt)
        }
    
        //ajout dans le DOM
        productColorElt.append(labelFormElt,selectFormElt)
    
        columnTwoELt.append(productNameElt, productAboutElt,productColorElt)
    
        //Prix - ajout panier
        //création des éléments
        const columnThreeELt = this.creerElement("div", `${produit}__column-three`)
        const productPriceHeadingElt = this.creerElement("h2", `${produit}__price--heading`, "", "Prix" )
        const productPriceElt = this.creerElement("p", `${produit}__price`, "", prix(infosProduit.price / 100))
        const productAddElt = this.creerElement("button", `${produit}__add`, "addToBAsket","Ajouter au panier")
    
        //fonction ajout au panier sur le boutton
        productAddElt.addEventListener("click", () => {
            const product = [{nom : productNameElt.textContent, prix : productPriceElt.textContent, qte : 1, id : infosProduit._id}]
            pageProduit.addToBasket(product)
            //panier.ajouter(product)
            //this.confirmationAjout()
        })
    
        const productConfirmElt = this.creerElement("p", `${produit}__confirm`, "confirmAdd")
        const counterClickElt = this.creerElement("span", "", "counterClick")
        const confirmTextElt = this.creerElement("span", "", "confirmText")
    
        //Ajout dans le DOM
        productConfirmElt.append(counterClickElt, confirmTextElt)
    
        columnThreeELt.append(productPriceHeadingElt, productPriceElt, productAddElt, productConfirmElt)
    
        productElt.append(columnOneELt, columnTwoELt, columnThreeELt)
    }

    //affichages des produits dans le panier
    creerPanier = (container, storage) => {
        container.innerHTML = ""
        const panier = storage.lire("panier")
        if (panier !== null) {
            //si panier non vide
            for (let i in panier) {
                //création de la liste de produits
                const lineElt = this.creerElement("tr", "basket__recap--row")
                const nameElt = this.creerElement("td", "basket__recap--name", "", panier[i].nom)
                const priceElt = this.creerElement("td", "basket__recap--price", "", panier[i].prix)
                const quantityElt = this.creerElement("td", "basket__recap--qty", "", "qte : " + panier[i].qte)
                const deleteElt = this.creerElement("button", "basket__recap--supr", "", "Supprimer")
                
                //fonction suppression d'un article du panier
                deleteElt.addEventListener("click", () => {
                    pagePanier.deleteProduct("panier", i)
                })

                //ajout dans le DOM
                lineElt.append(nameElt, priceElt, quantityElt, deleteElt)
                container.appendChild(lineElt)
            }
        } else {
            //affichage message panier vide
            this.messageErreur("main", "basketEmpty", "<h1>Votre panier est vide !</h1><h2>Veuillez ajouter des articles !</h2>")
        }
    }

    lierBoutonViderPanier(callback){
        const clearBasket = this.selectionnerElement("#basketClear")
        clearBasket.addEventListener("click", () => {
            //appel de la fonction passée en callback, ici emptyBasket
            callback()
        })
    }

    addLoader = (selecteur, id) => {
        //création loader
        const mainElt = this.selectionnerElement(selecteur)
        mainElt.id = id
        const loaderHeadingElt = this.creerElement("h2", "", "loaderHeading", "Chargement")
        const loaderElt = this.creerElement("div", "lds-roller", `div${id}`)
        //création des noeuds pour l'animation
        mainElt.appendChild(loaderHeadingElt)
        mainElt.appendChild(loaderElt)
        //création des div pour l'animation
        for (let i = 0; i < 8; i++) {
            const divElt = this.creerElement("div", "div__loader")
            loaderElt.appendChild(divElt)
        }
    }

    removeLoader = (selecteur, product) => {
        //Suppression loader
        const containerElt = this.selectionnerElement(selecteur)
        containerElt.id = `${product}Container`
        //suppression des noeuds de l'animation
        document.getElementById("divloader").remove()
        document.getElementById("loaderHeading").remove()
    }
    
    messageErreur = (selector, id, content) => {
         //affichage d'un message sur la page
        let mainElt = document.querySelector(selector);
        if (id) mainElt.id = id
        mainElt.innerHTML = content;
    }

    //loader commande en cours
    loaderCommande = () => {
        const mainElt = document.getElementById("formInvalid")
        mainElt.textContent="Envoie commande en cours ..."
        mainElt.id= "loaderCommande"
    }

    //message de confirmation d'ajout au panier
    confirmationAjout = () => {
        const confirmELt = this.selectionnerElement("#confirmText")
        const compteurElt = this.selectionnerElement("#counterClick")
        //création du message
        compteurElt.textContent = compteurClick()
        confirmELt.textContent = " Ourson(s) ajouté(s) au panier !"
        //supprimer le message apres 2s
        setTimeout( () => {
            confirmELt.textContent = ""
            compteurElt.textContent = ""
            compteur = 1
        }, 2000)
    }

    lierChampFormNom(callback){
        const lastNameField = this.selectionnerElement("#formLastName")
        lastNameField.addEventListener("blur", elt => {
            callback(elt)
        })
    }

    lierChampFormPrenom(callback){
        const firstNameField = this.selectionnerElement("#formFirstName")
        firstNameField.addEventListener("blur", elt => {
            callback(elt)
        })
    }

    lierChampFormAdresse(callback){
        const addressField = this.selectionnerElement("#formAddress")
        addressField.addEventListener("blur", elt => {
            callback(elt)
        })
    }

    lierChampFormCity(callback){
        const cityField = this.selectionnerElement("#formCity")
        cityField.addEventListener("blur", elt => {
            callback(elt)
        })
    }

    lierChampFormEmail(callback){
        const emailField = this.selectionnerElement("#formEmail")
        emailField.addEventListener("blur", elt => {
            callback(elt)
        })
    }

    lierEnvoiFormulaire(callback){
        const form = document.getElementById("basketForm").querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            callback(form)
        })
    }

    //récupération de la validation de commande
    afficherValidationCommande = (storage, commande) => {
        document.getElementById("orderPrice").textContent = prix(commande.prix)
        document.getElementById("orderId").textContent = commande.id
    }
    
}














