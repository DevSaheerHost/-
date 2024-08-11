const apiKey = '8400babe8ac49e6e362f297a86acd451';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

checkWeather = async (city) => {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    if (searchBox.value) {


        if (response.status == 404) {
            document.querySelector('.error').style.display = "block"
            // document.querySelector('.weather').style.display="none"
            document.querySelector(".weather").classList.remove('visible')

        } else {
            var data = await response.json()

            document.querySelector('.city').innerHTML = data.name
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c"
            document.querySelector('.humidity').innerHTML = data.main.humidity + "%"
            document.querySelector('.wind').innerHTML = data.wind.speed + " km/h"

            var weatherType = data.weather[0].main

            if (weatherType == "Clouds") {
                weatherIcon.src = "./images/clouds.png"
            } else if (weatherType == "Clear") {
                weatherIcon.src = "./images/clear.png"
            } else if (weatherType == "Rain") {
                weatherIcon.src = "./images/rain.png"
            } else if (weatherType == "Drizzel") {
                weatherIcon.src = "./images/drizzel.png"
            } else if (weatherType == "Mist") {
                weatherIcon.src = "./images/mist.png"
            }
            // $(".weather").slideDown()
            // document.querySelector('.weather').style.display="block"

            document.querySelector(".weather").classList.add('visible')
            document.querySelector('.error').style.display = "none"

        }
    }
}

searchBtn.onclick = () => {
    checkWeather(searchBox.value)

}

searchBox.onkeypress = (e) => {
    if (e.key == "Enter") {
        checkWeather(searchBox.value)
    }

}



// navigator.geolocation.getCurrentPosition((position) => {
//     let lat = position.coords.latitude;
//     let long = position.coords.longitude;
//     console.log(lat);
//     console.log(long);



//     // latText.innerText = lat.toFixed(2);
//     // longText.innerText = long.toFixed(2);
// });
