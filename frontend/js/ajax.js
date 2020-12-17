const ajaxGet = (url) => {
    return new Promise(function (resolve, reject ){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4){
                if(xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr);
                }
            }
        }
        xhr.send();
    })
}

