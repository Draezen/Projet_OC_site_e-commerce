
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

const contactTest = {
       firstName: "Thomas",
       lastName: "DANGER",
       address: "Chez moi",
       city: "Caen",
       email: "moi@google.com"
}

const productsTest = ["5be9c8541c9d440000665243", "123456789"]

const dataTest ={
    contactTest,
    productsTest
}
/*
//requette POST
async function envoieCommande (url, data){
    try{
        const response = await fetch (url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data),
        })
        let responseData = await response.json()
        console.log(responseData)
    } catch(e) {
        console.error(e)
    }
}

envoieCommande("http://localhost:3000/api/teddies/order", dataTest)
*/
