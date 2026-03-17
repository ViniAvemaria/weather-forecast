import { useState, useEffect, useRef } from "react";
import { CloudRainIcon } from "@/components/ui/cloud-rain";
import { useWeather } from "@/contexts/WeatherContext";
import { X } from "lucide-react";
import { SearchIcon } from "@/components/ui/search";
import { MapPinIcon } from "@/components/ui/map-pin";

const Header = () => {
    const { searchResult, setSearchResult, setCoor, searchCities } = useWeather();
    const [query, setQuery] = useState("");
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const inputRef = useRef(null);
    const searchIconRef = useRef(null);
    const mapPinIconRef = useRef(null);

    useEffect(() => {
        if (!query) return;

        if (searchResult.length) setIsResultOpen(true);
    }, [searchResult, query]);

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
        <div className="flex justify-between pt-10 gap-4 max-[900px]:flex-col">
            <div className="flex items-center gap-3 font-semibold">
                <CloudRainIcon className="text-primary-accent h-12 w-12 max-xs:h-10 max-xs:w-10" />
                <h2 className="text-3xl whitespace-nowrap max-xs:text-2xl">Weather Forecast</h2>
            </div>

            <div className="flex items-center w-full max-w-130 gap-3 max-[900px]:max-w-full max-[900px]:mt-3 max-[550px]:flex-col">
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
                            className="py-1.5 pl-3 w-full focus:outline-none max-[550px]:py-1.25"
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
                        className={`absolute w-full bg-input-bg border border-primary-border rounded-lg overflow-y-scroll transition-opacity-height duration-300 ease ${isResultOpen ? "opacity-100 max-h-55" : "opacity-0 max-h-0"}`}
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

                <div className="flex gap-3 max-[550px]:w-full">
                    <button
                        onMouseEnter={() => searchIconRef.current?.startAnimation()}
                        onMouseLeave={() => searchIconRef.current?.stopAnimation()}
                        disabled={locationLoading}
                        onClick={() => {
                            if (query !== "") searchCities(query);
                        }}
                        className={`flex items-center justify-center gap-1.5 whitespace-nowrap bg-primary-accent hover:bg-accent-hover transition-colors duration-300 ease rounded-lg px-2.5 py-1.5 max-[550px]:w-full ${locationLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <SearchIcon ref={searchIconRef} size={16} />
                        Search
                    </button>

                    <button
                        onMouseEnter={() => mapPinIconRef.current?.startAnimation()}
                        onMouseLeave={() => mapPinIconRef.current?.stopAnimation()}
                        onClick={handleLocation}
                        disabled={locationLoading}
                        className={`flex items-center justify-center gap-1.5 whitespace-nowrap relative overflow-hidden px-2.5 py-1.5 rounded-lg transition-colors duration-300 ease max-[550px]:w-full ${locationLoading ? "bg-secondary-bg cursor-not-allowed" : "bg-secondary-bg hover:bg-dark-hover cursor-pointer"}`}
                    >
                        {locationLoading && (
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                        )}
                        <MapPinIcon ref={mapPinIconRef} size={16} className="z-10" />
                        <span className="z-10">{locationLoading ? "Locating..." : "Location"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
