const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(cityName) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        div.setAttribute("id", "conditions");
        let country = document.createElement("h1");
        let countryNode = document.createTextNode(data.sys.country);
        country.appendChild(countryNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("Temparature: " +((data.main.temp)-273.15).toFixed(2) + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("Sky: " +data.weather[0].description);
        desc.appendChild(descNode);

        let humidity = document.createElement("div");
        let humidityNode = document.createTextNode("Humidity: " + data.main.humidity + "%");
        humidity.appendChild(humidityNode);

        let sunrise = document.createElement("div");
        let sunriseNode = document.createTextNode("Sunrise: " +new Date(data.sys.sunrise * 1000).toLocaleTimeString());
        sunrise.appendChild(sunriseNode)

        let sunset = document.createElement("div");
        let sunsetNode = document.createTextNode("Sunset: " +new Date(data.sys.sunset * 1000).toLocaleTimeString());
        sunset.appendChild(sunsetNode)

        let icon = document.createElement("img");
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        icon.setAttribute("alt", data.weather[0].description);

        div.appendChild(city);
        div.appendChild(country);
        div.appendChild(humidity);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(sunrise);
        div.appendChild(sunset);
        div.appendChild(icon);
        document.querySelector("main").appendChild(div);
    })
    .catch(err => {
        console.log(err);
        throw new Error("Could not retrieve weather information for the selected city.");
    });

}


document.addEventListener("DOMContentLoaded", (e) => {
    const cityForm = document.querySelector("#weatherForm");
    cityForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const city = document.querySelector("#citySelect").value;
      if (city !== "") {
        const conditionsDiv = document.querySelector("#conditions");
        if (conditionsDiv) {
          document.querySelector("main").removeChild(conditionsDiv);
        }
        try {
          await getWeatherConditions(city);
          const errorDiv = document.querySelector("#error");
          if (errorDiv) {
            document.querySelector("main").removeChild(errorDiv);
          }
        } catch (error) {
          console.error(error);
          let errorDiv = document.createElement("div");
          errorDiv.setAttribute("id", "error");
          let errorNode = document.createTextNode(error.message);
          errorDiv.appendChild(errorNode);
          document.querySelector("main").appendChild(errorDiv);
        }
      } else {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("id", "error");
        let errorNode = document.createTextNode("Please select a city.");
        errorDiv.appendChild(errorNode);
        document.querySelector("main").appendChild(errorDiv);
      }
    });
  });
