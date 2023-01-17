const apiBaseURL = "https://my-json-server.typicode.com/njmwasmoringa/shoeshop";

getShoes();

function getShoes(){
    return fetch(`${apiBaseURL}/shoes?_page=1&_limit=1&_sort=id&_order=desc`).then(resp=>resp.json()).then(respBody=>console.log(respBody));
}


function postShoe( shoe ){
    return fetch(`${apiBaseURL}/shoes`, {
        method:'POST',
        body:JSON.stringify(shoe),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(resp=>resp.json());
}

function formSubmitEvent( evnt ){
    evnt.preventDefault();

    const form = evnt.target;
    const shoe = {
        name: form.shoeName.value,
        number: form.shoeNumber.value,
        // image_url: imageUrl
    }

    const fr = new FileReader();
    const file = form.shoeImage.files[0];
    
    fr.onload = function( readEvent ){
        shoe.image_url = readEvent.target.result;
        
        postShoe( shoe ).then(resBOdy=>{
            document.getElementById('addedShoe').innerHTML = `<img src="${resBOdy.image_url}" width="50" >
            <h4>${resBOdy.name}</h4>
            <div>${resBOdy.number}</div>`;
        });
        form.reset();
        
    }

    fr.readAsDataURL( file );
    
}

function handleFileSelect( evnt ){
    const fr = new FileReader();
    const file = evnt.target.files[0];
    
    fr.onload = function( readEvent ){
        const imageUrl = readEvent.target.result;
        document.getElementById('shoePreview').innerHTML = `<img width="50" src="${imageUrl}" />`;
    }

    fr.readAsDataURL( file );
}