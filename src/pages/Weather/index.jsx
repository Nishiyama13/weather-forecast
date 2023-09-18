import WeatherInfo from "../../components/WeatherInfo";

export default function Weather({ city, setCity }) {
    return(
        <>
            <WeatherInfo city={city} setCity={setCity}/>
        </>
    );
}