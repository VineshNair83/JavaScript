//init storage object
const storage = new Storage();
//Get storage location data
const weatherLocation = storage.getLocationData();

//init weather object
const weather = new Weather(weatherLocation.city, weatherLocation.country);

//init ui
const ui = new UI();

//get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

//change location event
document.getElementById('w-change-btn').addEventListener('click' ,(e) => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;

  //change location
  weather.changeLocation(city, country);
  storage.setLocationData(city,country);

  //Get and display weather
  getWeather();

  //close modal
  $('#locModal').modal('hide');
})


//get weather
function getWeather(){
  weather.getWeather()
  .then(results => {
    if(results.cod == '404'){
      storage.setDefaultData('Miami', 'US');
      alert("City not found");
    }else{
      ui.paint(results);
    }
  })
  .catch(err => console.log('errorrrr',err));
}