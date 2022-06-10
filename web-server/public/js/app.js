console.log("Client side js file loaded");

const weatherForm= document.querySelector('form');
const search= document.querySelector('input');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location= search.value;
    console.log(location);
    const url= 'http://localhost:3000/weather?address='+location;
    
    fetch(url)
    .then((response)=>{
        console.log(response);
        return response.json(); 
    })
    .then((data)=>{
        if(data.error)
        {
            console.log(error);
        }
        else
        {
            console.log(data.des);
        }
    });
});
