
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#meassage-1');
const messageTwo = document.querySelector('#meassage-2');
const messageThree = document.querySelector('#meassage-3');

messageOne.textContent = 'Loading...';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(location);
    fetch ('http://localhost:3000/weather?serch=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error;
        }
        else
        {
            console.log(data.location);
            console.log(data.forecast);
          
            messageOne.textContent = 'Coordinates -> Latitude : ' + data.location.latitude + '  ||  Longitude : '+  data.location.longitude;
            messageThree.textContent = 'Location -> ' + data.location.location; 
            messageTwo.textContent = 'Temprature : ' +  data.forecast.Temp + '  ||  Precipitaion in mm : ' + data.forecast.Preci;
        }
    })
})
})

