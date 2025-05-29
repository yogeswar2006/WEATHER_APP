
const weatherBtn = document.querySelector("#submitbtn");
const card = document.querySelector(".card");
const apikey = "204bec606e2ec01191cd31311dccb8ad";


weatherBtn.addEventListener("click", async event => {
    event.preventDefault();
    const city = document.getElementById("city-input").value.trim().toLowerCase();
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    if (city) {
         const responses=await fetch(apiurl);
         if(responses.ok){
            const data=await responses.json();
            weatherInfo(data);
         }else{
            card.textContent="";
            card.style.display="flex";
            displayError("Error");

         }
         
    } else {
        displayError("enter valid city");
    }

});


function weatherInfo(data){
   
  const {name:city,main:{temp,humidity},weather:[{id,description}]}=data;

  card.textContent="";
  card.style.display="flex";
  const city_display=document.createElement("h1");
  const temp_display=document.createElement("p");
  const humid_display=document.createElement("p");
  const desc_display=document.createElement("p");
  const emoji_display=document.createElement("p");

  city_display.textContent=city;
  city_display.classList.add("cityDisplay");

  temp_display.textContent=`${temp}°C`;
  temp_display.classList.add("tempDisplay");

  humid_display.textContent=`Humidity:${humidity}%`;
  humid_display.classList.add("humidDisplay");

  desc_display.textContent=description;
  desc_display.classList.add("descDisplay");

  emoji_display.textContent=emoji_finder(id);
  emoji_display.classList.add("emojiDisplay");

  
    card.appendChild(city_display);
    card.appendChild(temp_display);
    card.appendChild(humid_display);
    card.appendChild(desc_display);
    card.appendChild(emoji_display);
 
}

function emoji_finder(id){
    const emoji_display=document.createElement("p");
    switch(true){
        case (id >= 200 && id <= 232): return "⛈️";
          break;
        case (id >= 300 && id <= 321): return "🌦️";
          break;
        case (id >= 500 && id <= 531): return "🌧️";
          break;
        case (id >= 600 && id <= 622): return "❄️";
          break;
        case (id >= 701 && id <= 781): return "🌫️";
          break;
        case (id == 800): return "☀️";
          break;
        case (id == 801): return "🌤️";
          break;
        case (id == 802): return "⛅";
          break;
        case (id >=803 && id <= 804): return "☁️";
          break;
        default:
            return "❓";  
        
    }
   
}

function displayError(message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("errorDisplay");

    card.textContent = "";
    card.appendChild(error);
    card.style.display = "flex";
}

