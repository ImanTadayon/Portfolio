let countries;
let countriesData = document.querySelector(".select-country");
let countryName = [];
let thisCountryWeather;
let list;
let icon;
let lat;
let lon;
let countryCode;
let imageCountry;
let imageArray = [];
let index = 0;
let timer;
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,currencies,cca2,languages,flag,area,population,flags,latlng,capitalInfo"
)
  .then((response) => response.json())
  .then((data) => selectcountry(data))
  .catch((error) => console.log("error : ", error));

function selectcountry(informationCountries) {
  countries = informationCountries;
  // console.log(informationCountries);

  for (let i = 0; i < countries.length; i++) {
    countryName.push(countries[i].name.common);
  }
  countryName = countryName.sort();
  let options = "";
  for (let i = 0; i < countryName.length; i++) {
    options += `<option value="${countryName[i]}">${countryName[i]}</option>`;
  }
  countriesData.innerHTML = options;
}

// ###############################################################################

countriesData.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    myFunction();
  }
});

function myFunction() {
  let countryName = document.getElementById("input").value;
  for (let i = 0; i < countries.length; i++) {
    if (countryName === countries[i].name.common) {
      lat = countries[i].latlng[0];
      lon = countries[i].latlng[1];

      countryCode = countries[i].cca2;
      // console.log(countries[i]);
      // console.log(countries[i].cca2);
      // console.log(countries[i].name.official);
      // console.log(countries[i].capital[0]);
      // console.log(countries[i].flags.svg);
      // console.log(countries[i].population);
      // console.log(countries[i].area);
      // console.log(Object.keys(countries[i].currencies).join(","));
      // console.log(
      //   countries[i].currencies[Object.keys(countries[i].currencies)].name
      // );

      // console.log(
      //   Object.values(countries[i].languages).toString().split(" , ").join(", ")
      // );
      // console.log(
      //   Object.values(countries[i].currencies)
      //     .toString()
      //     .split(" , ")
      //     .join(", ")
      // );
      // console.log("lat : ", lat);
      // console.log("log : ", lon);

      imageArray = [];
      index = 0;
      clearInterval(timer);
      result.innerHTML = `
      <img src="${countries[i].flags.svg}" class="flag-img">
                <h2>${countryName}</h2>
                <div class="wrapper">
                    <div class="data">
                        <h4>Official Name:  </h4><span>${
                          countries[i].name.official
                        }</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data">
                        <h4>Capital:  </h4><span>${
                          countries[i].capital[0]
                        }</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data">
                        <h4>Population:  </h4><span>${
                          countries[i].population
                        }</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data">
                        <h4>Area:  </h4><span>${countries[i].area}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data">
                        <h4>Currency:  </h4><span>${Object.keys(
                          countries[i].currencies
                        ).join(" , ")}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data">
                        <h4>Languages:  </h4><span>${Object.values(
                          countries[i].languages
                        )
                          .toString()
                          .split(" , ")
                          .join(" , ")}</span>
                    </div>
                </div>
                <hr class="line">
              `;

      // ########################     افزودن آب و هوا     #########################

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c1278d2b140ff7fe2bc0ea2c82be0957`
      )
        .then((response) => response.json())
        .then((data) => {
          list = data.list;
          weather.innerHTML = "";
          for (let i = 0; i < list.length; i++) {
            weather.innerHTML += `<div class="abvahava">Date-Time : ${
              list[i].dt_txt
            }&emsp;&emsp;Status : ${
              list[i].weather[0].description
            }&emsp;&emsp;Humidity : ${
              list[i].main.humidity
            }&emsp;&emsp;Temp : ${(list[i].main.temp - 273.15).toFixed(
              2
            )}°C<img src="https://openweathermap.org/img/wn/${
              list[i].weather[0].icon
            }.png" class="icon"></div>`;
          }
        })
        .catch((error) => console.log("error : ", error));

      // ###########################       افزودن تعطیلات       #############################

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      let holidayName = [];
      let holiDays;
      fetch(
        `https://holidayapi.com/v1/holidays?key=9a65c1c1-2268-47d3-b5d3-50d1719fe096&country=${countryCode}&year=2022&`
      )
        .then((response) => response.json())
        .then((i) => {
          holiDays = i.holidays;
          console.log(i.holidays);
          for (i = 0; i < holiDays.length; i++) {
            if (holiDays[i].date.split("-")[1] == month) {
              holidayName.push(holiDays[i].name);
              // console.log(holiDays[i].name);
              // console.log(holiDays[i].date);
              result.innerHTML += `
              <div class="wrapper">
                    <div class="data"><div class='boarder'>
              <h4>Holiday:  </h4><span style = "color: #8c0000 ; font-weight: bold">${holiDays[i].name}</span><h4><br><br>Date : </h4><span style = "color: #8c0000 ; font-weight: bold">${holiDays[i].date}</span><br><br>
              </div></div></div>`;
            }
          }
          if (holidayName.length == 0) {
            result.innerHTML += `
              <div class="wrapper">
                    <div class="data"><div class='boarder'><p style = "aline-item:center ; font-weight: bold"><b>There are no holidays in this country for this month</b></p>
              </div></div></div>`;
            console.log("There are no holidays in this country for this month");
          }
        })
        .catch((error) => console.log("error : ", error));

      // ########################     افزودن تصویر     #########################

      fetch(
        `https://api.unsplash.com/search/photos?client_id=ZBIhfqHoATih8_9kezkwrXOfrF-qAk_nl6Js69lY3D0&query=${countries[i].name.common}`
      )
        .then((response) => response.json())
        .then((data) => {
          imageCountry = data.results;
          for (let i = 0; i < imageCountry.length; i++) {
            imageArray.push(imageCountry[i].urls.regular);
          }

          timer = setInterval(() => {
            backGround.style.backgroundImage = `url('${imageArray[index]}')`;
            index++;
            if (index === imageArray.length - 1) {
              index = 0;
            }
          }, 5000);
        })
        .catch((error) => console.log("error : ", error));
    }
  }
}
const onButton = document.querySelector("#on");
const offButton = document.querySelector("#off");
onButton.addEventListener("click", () => {
  document.getElementById("weather").style.display = "none";
  document.getElementById("on").style.display = "none";
  document.getElementById("off").style.display = "block";
});
offButton.addEventListener("click", () => {
  document.getElementById("weather").style.display = "block";
  document.getElementById("on").style.display = "block";
  document.getElementById("off").style.display = "none";
});
