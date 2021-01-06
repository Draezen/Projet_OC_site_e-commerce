
//requêtte GET
async function getProduct (url) {
    try{
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            //console.error("Retour du serveur : ", response.status);
            return response.status
        }
    } catch(e) {
        console.log("Problème avec l'opération fetch");
        console.error(e)
        return e
    }
}


//requette POST
async function postOrder (url, data){
    try{
        const response = await fetch (url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        if (response.ok) {
            let data = await response.json()
            return data
        } else {
            return response.status
        }
    } catch(e) {
        console.error(e)
    }
}

