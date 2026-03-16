import { useState, useEffect } from "react";
import { iconMap } from "@/utils/weatherIcon";
import en from "i18n-iso-countries/langs/en.json";
import countries from "i18n-iso-countries";
countries.registerLocale(en);
import { useWeather } from "@/contexts/WeatherContext";
import { X } from "lucide-react";

const RecentSearch = ({ cityId, index }) => {
    const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

    const { setCoor, removeRecentSearch } = useWeather();

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const Icon = iconMap[weather?.weather?.[0]?.icon];

    const fetchWeather = async () => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`,
            );

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setWeather(data);
        } catch (err) {
            console.error(err);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        !loading && (
            <div
                onClick={() => {
                    setCoor({ lat: weather.coord.lat, lon: weather.coord.lon });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group relative flex flex-col w-full min-w-45 max-w-47 gap-8 border border-primary-border p-4 rounded-lg bg-primary-bg cursor-pointer hover:bg-primary-border transition-colors duration-300 ease"
            >
                <div className="flex justify-between gap-2 pr-2">
                    <div className="flex flex-col gap-1 min-w-0">
                        <h2 className="text-sm truncate">{weather.name}</h2>
                        <h3 className="text-muted-text text-xs truncate">
                            {countries.getName(weather.sys.country, "en")}
                        </h3>
                    </div>

                    <div>
                        <Icon className="w-8 h-8" />
                    </div>
                </div>

                <div className="flex flex-col items-start">
                    <h2 className="text-2xl text-center">{`${Math.round(weather.main.temp)}°`}</h2>
                    <p className="capitalize text-sm text-secondary-text">{weather.weather[0].description}</p>
                </div>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(index);
                    }}
                    className="absolute right-0 top-0 p-1.25 text-muted-text hover:text-primary-text"
                >
                    <X className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-colors-opacity duration-200 ease" />
                </div>
            </div>
        )
    );
};

export default RecentSearch;
