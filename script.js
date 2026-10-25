const wapi =
  "https://api.open-meteo.com/v1/forecast?latitude=28.4089&longitude=77.3178&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code";
const addupi =
  "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}";

  
const changeaddress = document.querySelector(".selectaddress");
const cancle = document.querySelector("#cancle");
const confirm = document.querySelector("#confirm");
const changelocation = document.querySelector("#changeloc");
const currentlocation = document.querySelector(".currentloc");
const address = document.querySelector("#location");
const weathertype = document.querySelector("#weather");
const windspeed = document.querySelector("#wind");
const showtemprature = document.querySelector("#temprature");
const currentlocationbtn = document.querySelector("#clbtn");
const inputi = document.querySelector("#input");
const bgc = document.querySelector(".top");
const msgbox=document.querySelector(".showmsg");

//start  operation from here
//show error msg 

function showmsg(message){
  msgbox.innerText=message;
  msgbox.style.display='block';
  msgbox.style.animation = "showMessage 2s ease forwards";
  setTimeout(() => {
    msgbox.style.display='none';    
  }, 2000);

}
//by pincode
async function pin(pincode) {
  let data = await fetch(
    `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${pincode}&country=IN&username=kabeerul`,
  );
  let dati = await data.json();
  let lat = dati.postalCodes[0].lat;
  let lng = dati.postalCodes[0].lng;
  let placename = dati.postalCodes[0].placeName;
  let location = {
    latitude: lat,
    longitude: lng,
  };
  return location;
}
//update ui unction
function updateui(place, wtype, temprature, wind) {
  address.innerText = place;
  weathertype.innerText = wtype;
  showtemprature.innerText = temprature;
  windspeed.innerText = wind;
}
//cancel btn work
cancle.addEventListener("click", () => {
  changeaddress.style.display = "none";
});
//change address work
changelocation.addEventListener("click", () => {
  changeaddress.style.display = "block";
});

//get currentlocation function
async function getcurrentloc() {
  const position = await new Promise((res) => {
    navigator.geolocation.getCurrentPosition(res);
  });
  let positions = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  return positions;
}
//get current location call
currentlocationbtn.addEventListener("click", () => {
  getcurrentloc().then((result) => {
    masteroparation(result);
    crede(result);
  });
  changeaddress.style.display = "none";
});

//get by name
async function place(placename) {
  try{
  let place = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(placename)}&count=5&language=en&format=json`,
  );
  let placi = await place.json();
  let latitude = placi.results[0].latitude;
  let longitude = placi.results[0].longitude;
  let placeName = placi.results[0].name;
  let location = {
    latitude: latitude,
    longitude: longitude,
    placeName: placeName,
  };
  return location;
}
catch{
  showmsg("please enter a valide place")
  
}
}

//asynch function to controll current location data print
async function masteroparation(loc) {
  
  //get name
  let add = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.latitude}&lon=${loc.longitude}`,
  );
  let data = await add.json();
  let place = data.display_name;
  let addi = place;
  let w = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`,
  );
  let weather = await w.json();
  let temprature = `${weather.current.apparent_temperature} ${weather.current_units.apparent_temperature}  `;
  let windspeedi = `wind speed :${weather.current.wind_speed_10m} ${weather.current_units.wind_speed_10m}  `;
  let weathertype = getWeatherType(weather.current.weather_code);
  updateui(addi, weathertype, temprature, windspeedi);
}

confirm.addEventListener("click", async () => {
  let data = inputi.value.trim();

  if (/^[1-9]\d{5}$/.test(data)) {
    try{
    let loc = await pin(data);
    await masteroparation(loc);
     crede(loc);
    changeaddress.style.display = "none";
    
    }catch{
      showmsg("invalid ! pease enter valid pincode");
    }
  } else {
    try{
    let loc = await place(data);
    await masteroparation(loc);
    crede(loc);
    changeaddress.style.display = "none";
    }catch{
      showmsg("please enter valid  place name");
    }
  }
});
//chnange bg functon
function bg(url) {
  bgc.style.backgroundImage = `url(${url})`;
}
function getWeatherType(code) {
  if (code === 0) {
    bg("./image/0.png");
    return "Sunny";
  }
  if (code === 1) {
    bg("./image/1.png");
    return "Mainly Clear";
  }
  if (code === 2) {
    bg("./image/2.png");
    return "Partly Cloudy";
  }
  if (code === 3) {
    bg("./image/3.png");
    return "Cloudy";
  }

  if (code === 45 || code === 48) {
    bg("./image/4548.png");
    return "Foggy";
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    bg("./image/515355.png");
    return "Drizzle";
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    bg("./image/616365808182.png");
    return "Rainy";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    bg("./image/717375778586.png");
    return "Snowy";
  }

  if ([95, 96, 99].includes(code)) {
    bg("./image/959699.png");
    return "Thunderstorm";
  }

  return "Unknown Weather";
}
//call current location 
getcurrentloc().then((result) => {
    masteroparation(result);
    crede(result);
  });
//get credential 
async function crede(loc) {
  let url=getminutlyurl(loc.latitude,loc.longitude);
  let d=await fetch(url);
  let data=await d.json();
  temp=data.minutely_15.temperature_2m;
  temp1=temp.slice(0,96);
  genrategraph(temp1,timeminutes,tempraturedegrees,)

  
}
  //callgraphs
  function gethourlyurl(latitude,longitude){
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`;
  }
  function getminutlyurl(latitude,longitude){
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&minutely_15=temperature_2m,precipitation&timezone=auto`;
  }
  