const IPapi = "https://api.ipify.org";
const locationInf = document.getElementById("locationinfo");
const weatherInfo = document.getElementById("weatherinfo");
let dataForShi = [];

const IPinfoapi = "https://ipapi.co/json/";
fetch(IPinfoapi)
  .then(response => response.json())
  .then(data => {
    console.log('API response:', data);
    const createElement = (element, info, value,parent) => {
      let p = document.createElement(element);
      p.innerHTML = info + ": " + value;
      parent.appendChild(p);
    }

    let latitude = data.latitude;
    let longitude = data.longitude;
    createElement('h4','Your location info','',locationInf)
    createElement('p', 'IP', data.ip,locationInf);
    createElement('p', 'City', data.city,locationInf);
    createElement('p', 'Country', data.country_name,locationInf);
    createElement('p', 'Timezone', data.timezone,locationInf);
    createElement('p', 'Latitude', latitude,locationInf);
    createElement('p', 'Longitude', longitude,locationInf);

    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    console.log('Weather API URL:', weatherAPI);

    fetch(weatherAPI)
      .then(response => response.json())
      .then(weatherData => {
        console.log('Weather API response:', weatherData);
        let temp = weatherData.current_weather.temperature;
        let windspeed = weatherData.current_weather.windspeed;
        let winddirection = weatherData.current_weather.winddirection;
        createElement('h4','Your weather info','',weatherInfo);
        createElement('p', 'Temperature', temp+"°C",weatherInfo);
        createElement('p', 'Wind Speed', windspeed+" km/h",weatherInfo);
        createElement('p','Wind Direction', winddirection+"°",weatherInfo)
        

      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
