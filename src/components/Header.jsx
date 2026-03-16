import { useState, useEffect, useRef } from "react";
import { CloudRainIcon } from "@/components/ui/cloud-rain";
import { useWeather } from "@/contexts/WeatherContext";
import { Search as Magnifying, MapPin, X } from "lucide-react";

const Header = () => {
    const { searchResult, setSearchResult, setCoor, searchCities } = useWeather();
    const [query, setQuery] = useState("");
    const [isResultOpen, setIsResultOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!query) return;

        if (searchResult.length) setIsResultOpen(true);
    }, [searchResult, query]);

    const handleLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoor({ lat: latitude, lon: longitude });
            },
            (err) => {
                console.error(err);
            },
        );
    };

    return (
        <div className="flex justify-between pt-10">
            <div className="flex items-center gap-3 font-semibold">
                <CloudRainIcon size={40} className="text-primary-accent" />
                <h2 className="text-3xl whitespace-nowrap">Weather Forecast</h2>
            </div>

            <div className="flex items-center w-full max-w-130 gap-3 max-sm:flex-col max-sm:gap-4">
                <div className="relative w-full">
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
                        className={`absolute w-full mt-1 bg-input-bg border border-primary-border rounded-lg overflow-y-scroll transition-opacity-height duration-300 ease ${isResultOpen ? "opacity-100 max-h-55" : "opacity-0 max-h-0"}`}
                    >
                        {searchResult.map((city) => (
                            <button
                                onClick={() => {
                                    setSearchResult([]);
                                    setIsResultOpen(false);
                                    setCoor({ lat: city.lat, lon: city.lon });
                                }}
                                key={city.lat}
                                className="w-full text-start px-3 py-2 cursor-pointer border-b border-primary-border last:border-b-0 hover:bg-dark-hover transition-colors duration-300 ease truncate"
                            >
                                {`${city.name}, ${city.state ?? ""}${city.state ? ", " : ""}${city.country}`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            if (query !== "") searchCities(query);
                        }}
                        className="flex items-center justify-center gap-1.5 whitespace-nowrap bg-primary-accent hover:bg-accent-hover cursor-pointer transition-colors duration-300 ease rounded-lg px-2.5 py-1.5 max-sm:w-full"
                    >
                        <Magnifying className="w-4 h-4" />
                        Search
                    </button>

                    <button
                        onClick={handleLocation}
                        className="flex items-center justify-center gap-1.5 whitespace-nowrap bg-secondary-bg hover:bg-dark-hover cursor-pointer transition-colors duration-300 ease rounded-lg px-2.5 py-1.5 max-sm:w-full"
                    >
                        <MapPin className="w-4 h-4" />
                        Location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
