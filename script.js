const apiKey = '12821ba14ce0ae10477a09098cc4b977'

function getWeather() {
    const cityID = document.querySelector('.city').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&lang=ru&appid=${apiKey}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

const cityList = {
    'Тула': 480562,
    'Москва': 524894,
    'Лондон': 2643743,
    'Минск': 625144,
    'Нью-Йорк': 5128638,
    'Киев': 703448,
}
const liClass = ["temp", "feels-like", "humidity", "wind", "pressure",];

let img = document.createElement('img')
img.classList.add('icon')
let h1 = document.querySelector('.city-name');
document.querySelector('header').append(img);

function createUl() {
    let ul = document.createElement('ul');
    ul.classList.add('list-ul');
    document.querySelector('.weather').append(ul);
}

function fillingLi(arr) {
    let ul = document.querySelector('.list-ul');
    let result = '';
    for (i = 0; i < arr.length; i++) {
        result += `<li class=${arr[i]}></li>`;
    }
    ul.innerHTML = result;
}

function createSelect() {
    let select = document.createElement('select');
    select.classList.add('city');
    select.style.background = 'rgb(172, 252, 255)'
    document.querySelector('.weather').append(select);
}

function fillingSelect() {
    let elem = document.querySelector('.city');
    for (let key in cityList) {
        let options = document.createElement('option');
        options.textContent = key;
        options.value = cityList[key];
        elem.appendChild(options);
    }
}

createUl();
fillingLi(liClass);
createSelect();
fillingSelect();

function showWeather(data) {
    h1.textContent = data.name;
    document.querySelector('.temp').innerHTML = `Температура: ${Math.round(data.main.temp)}&deg; `;
    document.querySelector('.feels-like').innerHTML = `Ощущается как: ${Math.round(data.main.feels_like)}&deg; `;
    document.querySelector('.humidity').textContent = `Влажность:${data.main.humidity} % `;
    document.querySelector('.wind').textContent = `Ветер: ${Math.round(data.wind.speed)} м/c`;
    document.querySelector('.pressure').textContent = `Давление: ${data.main.pressure} hPa`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
    img.alt = `${data.weather[0]['description']}`
    document.querySelector('.description').textContent = data.weather[0]['description'];
};

getWeather();

document.querySelector('.city').onchange = getWeather;
