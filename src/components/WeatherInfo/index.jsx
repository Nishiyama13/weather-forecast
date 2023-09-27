import { useEffect, useState } from 'react';
import styled from 'styled-components';
export default function WeatherInfo({ city, setCity }) {
    
    const weatherkey = import.meta.env.VITE_API_WEATHER_KEY;
    const [searchValue, setSearchValue] = useState('');
    const [temp_min, setTemp_min] = useState('');
    const [temp_max, setTemp_max] = useState('');
    const [temp, setTemp] = useState('');
    const [weather, setWeather] = useState('');
    const initianCity = "Mauá"
    const [backgroudColor, setBackgroudColor] = useState('#8E8E8E');

    useEffect(() => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                getCityFromCoords(latitude, longitude);
            });
        }
        showWeatherData(initianCity);
    },[]);

    async function searchCity(event) {
        event.preventDefault();
        showWeatherData (searchValue)
    }

    async function showWeatherData (city) {
        getWeatherData(city);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            showWeatherData (searchValue)
        }
    }

    async function getCityFromCoords(latitude, longitude) {
        const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherkey}&lang=pt_br`

        try {
            const res = await fetch(geoApiUrl)
            const data = await res.json();
            updateWeatherData(data);
        } catch (error) {
            console.log(error.message);
            alert("Cidade não encontarda. Por favor, verifique o nome da cidade e tente novamente.")
        }
    }

    async function getWeatherData (city) {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherkey}&lang=pt_br`

        try {
            const res = await fetch(apiWeatherURL)
            const data = await res.json();
            updateWeatherData(data);
        } catch (error) {
            console.log(error.message);
            alert("Cidade não encontarda. Por favor, verifique o nome da cidade e tente novamente.")
        }
    }

    async function updateWeatherData(data) {
        setCity(data.name);
        setTemp_min(data.main.temp_min.toFixed(1));
        setTemp_max(data.main.temp_max.toFixed(1));
        setTemp(data.main.temp.toFixed(1));
        updateWetherInfo(data.weather[0].main);
    }

    function updateWetherInfo(weather) {
        switch(weather) {
            case 'Clear':
                setWeather('Céu Aberto');
                setBackgroudColor('#e9e642');
                break;
            case 'Clouds':
                setWeather('Nublado');
                setBackgroudColor('grey');
                break;
            case 'Rain':
                setWeather('Chovendo');
                setBackgroudColor('blue');
                break;
            case 'Snow':
                setWeather('Nevando')
                setBackgroudColor('#c4c3bd');
                break;
            case 'Thunderstorm':
                setWeather('Tempestade');
                setBackgroudColor('#ca00d1');
                break;
            case 'Drizzle':
                setWeather('Chuviscando');
                setBackgroudColor('lightblue');
                break;
            case 'Mist':
                setWeather('Neblina');
                setBackgroudColor('lightgrey');
                break;
            default:
                setWeather('');
                setBackgroudColor('red');
                break;
        }
    }

    return(
        <>
            <InputContainer>
                <input type="text" placeholder='Digite uma cidade' id='city-input' value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/>
                <button type='button' id='search' onClick={searchCity}>Buscar</button>   
            </InputContainer>
            <WheatherContainer backgroudColor={backgroudColor}>
                <div>
                    <h3>Agora: <span id='name'>{city ? city: initianCity}</span></h3>
                    <p>Mínima: <span value={temp_min} id='temp_min'>{temp_min}</span>&deg;C</p>
                    <p>Máxima: <span value={temp_max} id='temp_max'>{temp_max}</span>&deg;C</p>
                </div>
                <CurrentTemperature>
                    <p><span>{weather}</span></p>
                    <h2><span value={temp} id='temp'>{temp}</span>&deg;C</h2>
                </CurrentTemperature>
            </WheatherContainer>
        </>
    );
}

const WheatherContainer = styled.div`
    width: 50%;
    border-radius: 10px;
    background-color: ${props => props.backgroudColor};
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    color: white;
    font-size: 14px;
    align-items: center;
    text-align: left;

    h2 {
        font-size: 30px;
        font-weight: 400;
        color: white;
        margin: auto;
    }
    
    p{
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;
const CurrentTemperature = styled.div`
    p {
        margin-bottom: -10px;
        margin-right: -10px;
    }
`
const InputContainer = styled.div`
margin-bottom: 15px;


    input {
        background-color: white;
        height: 15px;
        color: black;
        border-radius: 5px;
    }
    button {
        background-color: #dbd8d8;
        height: 20px;
        color: black;
        border-radius: 5px;
    }
`