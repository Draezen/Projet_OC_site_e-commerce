let teddies = [];

const getPost = () => {
    return ajaxGet("http://localhost:3000/api/teddies")
    .then (function (reponse) {
        teddies = JSON.parse(reponse);
        return teddies
    })
    .catch (function (error) {
        console.error("Erreur AJAX", error)
    })
}

getPost().then (function (teddies){
    console.log(teddies)
})