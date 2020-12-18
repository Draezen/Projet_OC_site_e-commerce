
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

