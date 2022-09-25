const p = document.querySelector('.p');
const button = document.querySelector('.button');
const input = document.querySelector('#city');
const button2 = document.querySelector('.button2');
const container =  document.querySelector('.forecast');

// button.addEventListener('click', function (e) {
//     const inputValue = input.value;
//     const xhttp = new XMLHttpRequest();
//     // ! створити новий http запит
//
//     xhttp.responseType = 'json'
//     // responseType - тип даних який поверне сервер
//
//
//     xhttp.onload = function () {
//         // p.innerHTML = 'Okay';
//         console.log(this.response);
//         // ! responseText - те що нам відповідає сервер у текстовому форматі(string)
//         // ! response = це що нам відповідає сервер
//         // p.innerHTML = this.response.weather[0].description;
//         p.insertAdjacentHTML('afterbegin', `
// <div class="p-table">
// <div class="p-content">Description ${this.response.weather[0].description}</div>
// <div class="p-content">Wind Speed ${this.response.wind.speed} m/s</div>
// <div class="p-content">Temperature ${convertKelvinToCelsius(this.response.main.temp)}°</div>
// </div>`);
//
//     }
//     // ! назва серверу.onload - після відповіді сервера виконується
//
//     xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?appid=f01fa6a8d934f2610e28e62b4c093239&q=${inputValue}`)
//     // ! xhttp.open('метод' 'посилання на потрібний сервер') - налаштування запиту
//
//     xhttp.send()
//     // ! відправлення запиту
// });

// ! сайт з погодою https://openweathermap.org/


// Kelvin Celsius

// 0 K = -273,15 C
// 285,25K = 285,25 K - -273,15 == C



button2.addEventListener('click', function (e) {

    const inputValue2 = input.value;

    const xhttp2 = new XMLHttpRequest();

    xhttp2.responseType = 'json';

    let days = new Map();


    xhttp2.onload = function () {

        for (let i = 0; i < this.response.list.length; i++) {

            const unixTime = Number(this.response.list[i].dt) // 1664096400

            const date = new Date(unixTime * 1000);


            let weatherForOneDay = days.get(date.getDate()) // [ {1}, {2} ]

            const key = date.getDate()

            if (days.has(key)) {
                weatherForOneDay.push(this.response.list[i])
                days.set(key, weatherForOneDay)
            } else {
                days.set(key, [this.response.list[i]])
            }


            // date.toLocaleString("en-US", {timeZone: "Europe/Kiev"})

//             console.log(`${this.response.list[i].dt_txt} ${this.response.list[i].clouds.all}`);
//             p.insertAdjacentHTML('afterbegin', `
// <div class="p-table">
// <div class="container">
// <div class="date">date: ${this.response.list[i].dt_txt}</div>
// <div class="content"> clouds: ${this.response.list[i].clouds.all}</div>
// </div>
// </div>`);
        }

        console.log(days)

        //[25, 26, 27, 28]


        let childIndex = 0;
        for (const key of days.keys()) {
            console.log(days.get(key))

            const weather = days.get(key) // погода по годинам
            container.children[childIndex].firstElementChild.innerHTML = key;

            for (let i = 0; i < weather.length; i++) {
                // p.insertAdjacentHTML('afterbegin', `
                //    <div class="p-weather">
                //     ${weather[i].clouds.all}
                //    </div>
                // `);
                container.children[childIndex].children[1].innerHTML += `<div class="container2">${weather[i].dt_txt + " "} <div class="content"> clouds: ${+ weather[i].clouds.all + " "} </div>
                <div class="content"> temperature: ${+ convertKelvinToCelsius(weather[i].main.temp + " ")} °</div>
</div>`;
            }


            childIndex++;
        }

    }

    xhttp2.open("GET", `https://api.openweathermap.org/data/2.5/forecast?appid=4018b5d34e471c5c55ebe094d4edb10f&q=${inputValue2}`);

    xhttp2.send();
});

function convertKelvinToCelsius(Kelvin) {
    return Math.round(Kelvin - 273.15)
}