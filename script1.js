const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

function getweather(){
    const APIKey = '518cfc4032dd57c291053938f709d213';
    const city = document.getElementById("cityinput").value;
    const imageUrl = `https://source.unsplash.com/1600x900/?${city}/?darkimage`;
    document.body.style.backgroundImage = `url('${imageUrl}')`;


    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`).then(response => response.json()).then(data => {
        
        if(data.cod =='404'){
            cityHide.textContent = city;
            container.style.height='450px';
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            error404.classList.add('active');
            return;
        }
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");


        if(cityHide.textContent==city){
            return;
        }
        else {
            cityHide.textContent = city;

            container.style.height='555px';
            container.classList.add('active')
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active')
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active')
            }, 2500);

            const image = document.getElementById("images");
            const desc = `${data.weather[0].description}`;

            let value=`${data.main.temp}`
            let value1=value-273.15;
            document.getElementById("temp").innerHTML = value1.toFixed()+"°C";

            const hum=`${data.main.humidity}`
            document.getElementById("hump").innerHTML = hum+"%";

            let sp=`${parseInt(data.wind.speed)}`
            document.getElementById("spee").innerHTML = sp+" km/h";

            document.getElementById("description").innerHTML= desc;
            if(desc==="smoke"){
                image.src="image/dust.png";
            }
            else if(desc==="fog"){
                image.src="image/fog.png";
            }
            else if(desc==="haze"){
                image.src="image/haze.png";
            }
            else if(desc==="storm"){
                image.src="image/storm.png";
            }
            else if(desc==="clear sky"){
                image.src="image/sun.png";
            }
            else if(desc==="rain"){
                image.src="image/rain.png";
            }        
            else if(desc==="snow"){
                image.src="image/snow.png";
            }  
            else if(desc==="few clouds"){
                image.src="image/clouds.png";
            } 
            else if(desc==="broken clouds"){
                image.src="image/cloud.png";
            } 
            else if(desc==="mist"){
                image.src="image/mist.png";
            }       
            else{
                image.src="image/cloudy.png";
            }
            

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone')

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone')

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone')

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            },2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if(totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }   
    })
}