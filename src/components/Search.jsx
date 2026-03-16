import { useState, useEffect, useRef } from "react";
import { Search as Magnifying, MapPin, X, Clock } from "lucide-react";
import { CloudRainIcon } from "@/components/ui/cloud-rain";
import { useWeather } from "@/contexts/WeatherContext";
import RecentSearch from "./RecentSearch";

const Search = () => {
    const { searchResult, setSearchResult, setCoor, searchCities, recentSearch } = useWeather();
    const [query, setQuery] = useState("");
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (searchResult.length) setIsResultOpen(true);
    }, [searchResult]);

    const handleLocation = async () => {
        setLocationLoading(true);

        try {
            const pos = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject),
            );

            const { latitude, longitude } = pos.coords;
            setCoor({ lat: latitude, lon: longitude });
        } catch (err) {
            console.error(err);
        } finally {
            setLocationLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-dvh w-full py-12">
            <div className="flex flex-col items-center gap-8 w-full">
                <CloudRainIcon size={80} className="text-primary-accent" />
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-5xl whitespace-nowrap max-[500px]:text-4xl">Weather Forecast</h1>
                    <h2 className="text-muted-text text-xl text-center max-[500px]:text-lg">
                        Search for a city or use your current location
                    </h2>
                </div>

                <div className="flex w-full max-w-180 gap-3 mt-4 max-sm:flex-col max-sm:gap-4">
                    <div className="w-full relative">
                        <div className="flex items-center gap-2 pr-1 bg-input-bg border border-primary-border rounded-lg w-full transition-colors duration-300 ease focus-within:border-primary-accent">
                            <input
                                id="search-input"
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (query !== "") searchCities(query);
                                    }
                                }}
                                className="py-1.5 pl-3 w-full focus:outline-none"
                                type="text"
                                placeholder="Search for a city..."
                                autoComplete="off"
                            />

                            <button
                                onClick={() => {
                                    setIsResultOpen(false);
                                    setQuery("");
                                    inputRef.current.focus();
                                }}
                                className={`p-1.5 hover:text-primary-accent cursor-pointer transition-colors-opacity duration-150 ease ${query ? "opacity-100" : "opacity-0"}`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div
                            className={`z-10 absolute w-full mt-1 bg-input-bg border border-primary-border rounded-lg overflow-y-scroll transition-opacity-height duration-300 ease ${isResultOpen ? "opacity-100 max-h-55" : "opacity-0 max-h-0"}`}
                        >
                            {searchResult.length === 0 ? (
                                <div className="flex">
                                    <span className="px-3 py-2">Not found</span>
                                </div>
                            ) : (
                                searchResult.map((city) => (
                                    <button
                                        onClick={() => {
                                            setSearchResult([]);
                                            setCoor({ lat: city.lat, lon: city.lon });
                                        }}
                                        key={city.lat}
                                        className="w-full text-start px-3 py-2 cursor-pointer border-b border-primary-border last:border-b-0 hover:bg-dark-hover transition-colors duration-300 ease truncate"
                                    >
                                        {`${city.name}, ${city.state ?? ""}${city.state ? ", " : ""}${city.country}`}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                if (query !== "") searchCities(query);
                            }}
                            className="flex items-center justify-center gap-2 whitespace-nowrap bg-primary-accent hover:bg-accent-hover cursor-pointer transition-colors duration-300 ease rounded-lg px-3 py-1.5 max-sm:w-full"
                        >
                            <Magnifying className="w-4 h-4" />
                            Search
                        </button>

                        <button
                            onClick={handleLocation}
                            className="flex items-center justify-center gap-2 whitespace-nowrap bg-secondary-bg hover:bg-dark-hover cursor-pointer transition-colors duration-300 ease rounded-lg px-3 py-1.5 max-sm:w-full"
                        >
                            <MapPin className="w-4 h-4" />
                            Use Location
                        </button>
                    </div>
                </div>

                {recentSearch.length && (
                    <div className="mr-auto mt-4 w-full">
                        <div className="flex items-center gap-2 mb-6">
                            <Clock className="h-5 w-5 text-secondary-text" />
                            <h2 className="text-xl">Recent Searches</h2>
                        </div>

                        <div className="flex gap-6 overflow-x-scroll">
                            {recentSearch.map((cityId, index) => (
                                <RecentSearch key={cityId} cityId={cityId} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
