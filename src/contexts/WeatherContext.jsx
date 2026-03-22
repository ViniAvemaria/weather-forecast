import { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext();

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

export function WeatherProvider({ children }) {
    const [searchResult, setSearchResult] = useState([]);
    const [coor, setCoor] = useState({ lat: null, lon: null });
    const [searchResultLoading, setSearchResultLoading] = useState(false);

    const [weather, setWeather] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);

    const [forecast, setForecast] = useState(null);
    const [forecastLoading, setForecastLoading] = useState(false);

    const [recentSearch, setRecentSearch] = useState(() => {
        const stored = localStorage.getItem("recentSearch");
        return stored ? JSON.parse(stored) : [];
    });

    const searchCities = async (query) => {
        setSearchResultLoading(true);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
            );

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setSearchResult(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setSearchResult([]);
        } finally {
            setSearchResultLoading(false);
        }
    };

    const fetchWeather = async () => {
        setWeatherLoading(true);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coor.lat}&lon=${coor.lon}&appid=${API_KEY}&units=metric`,
            );

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setWeather(data);
            addRecentSearch(data.id);
        } catch (err) {
            console.error(err);
            setWeather(null);
        } finally {
            setWeatherLoading(false);
        }
    };

    const fetchForecast = async () => {
        setForecastLoading(true);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${coor.lat}&lon=${coor.lon}&appid=${API_KEY}&units=metric`,
            );

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
            setForecast(data);
        } catch (err) {
            console.error(err);
            setForecast(null);
        } finally {
            setForecastLoading(false);
        }
    };

    const addRecentSearch = (id) => {
        setRecentSearch((prev) => {
            const filtered = prev.filter((c) => c !== id);

            const updated = [id, ...filtered].slice(0, 5);

            localStorage.setItem("recentSearch", JSON.stringify(updated));
            return updated;
        });
    };

    const removeRecentSearch = (index) => {
        setRecentSearch((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            localStorage.setItem("recentSearch", JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        if (coor.lat && coor.lon) {
            fetchWeather();
            fetchForecast();
        }
    }, [coor.lat, coor.lon]);

    return (
        <WeatherContext.Provider
            value={{
                searchResult,
                coor,
                weather,
                forecast,
                weatherLoading,
                forecastLoading,
                recentSearch,
                searchResultLoading,
                addRecentSearch,
                removeRecentSearch,
                setCoor,
                setSearchResult,
                setWeather,
                searchCities,
                fetchWeather,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}

export function useWeather() {
    return useContext(WeatherContext);
}
