
//requêtte GET
async function getProduct (url) {
    try{
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            console.error("Retour du serveur : ", response.status)
        }
    } catch(e) {
        console.error(e)
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
        let responseData = await response.json()
        return responseData
    } catch(e) {
        console.error(e)
    }
}

