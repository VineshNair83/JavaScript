class Weather {
  constructor(city, country){
    this.apikey = '1098bf7330414795f4d6b4ef99939f04';
    this.city = city;
    this.country = country;
  }

//Fetch weather from API
async getWeather(){

  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&APPID=${this.apikey}`);

  const responseData = await response.json();

  return responseData;

}

//change weathe location
changeLocation(city, state){
  this.city = city;
  this.country = country;
}

}
