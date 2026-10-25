

function getFutureUrl(latitude, longitude) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&forecast_days=16`;
}
function getHourlyUrl(latitude, longitude) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto&forecast_days=16`;
}
const urlmin = `https://api.open-meteo.com/v1/forecast?latitude=28.435852&longitude=77.318184&minutely_15=temperature_2m,precipitation&timezone=auto`;
let url=getHourlyUrl(28.4089,77.3178);
url=urlmin;
(
  async () => {
    let d=await fetch(url);
    let data=await d.json();
    console.log(data);
    
  }
)();