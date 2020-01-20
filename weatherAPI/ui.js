class UI {
  constructor(){
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelslike = document.getElementById('w-feels-like');
    this.dewspoint = document.getElementById('w-dewpoint');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather){
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = Math.round(weather.main.temp) + String.fromCharCode(176) + "c";

    const icon = weather.weather[0].icon;
    const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`
    
    this.icon.setAttribute('src', icon_url);
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
    const feelLike = Math.round(weather.main.feels_like) + String.fromCharCode(176) + "c"
    this.feelslike.textContent = `Feels Like: ${feelLike}`;

    if(typeof weather.visibility !== 'undefined'){
      const visibility_miles = Math.round(weather.visibility * 0.00062137,2);
      this.dewspoint.textContent = `Visibility: ${visibility_miles} Miles`;
    }else{
      this.dewspoint.textContent = 'Visibility: Not known'
    }

    this.wind.textContent = `Wind: ${weather.wind.speed} MPH`;

  }
}
