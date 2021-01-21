class Request {
    constructor(){
    }

    async requete (url, init) {
        try{
            const response = await fetch(url, init)
            if (response.ok) {
                const data = await response.json()
                return data
            } else {
                return response.status
            }
        } catch(e) {
            console.log("Problème avec l'opération fetch");
            console.error(e)
            return e
        }
    }

    init(order){
        return  {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(order)
        }
    }
}
