import { useState, useEffect, useRef } from "react";
import { X, Clock } from "lucide-react";
import { SearchIcon } from "@/components/ui/search";
import { MapPinIcon } from "@/components/ui/map-pin";
import { CloudRainIcon } from "@/components/ui/cloud-rain";
import { useWeather } from "@/contexts/WeatherContext";
import RecentSearch from "./RecentSearch";

const Search = () => {
    const { searchResult, setSearchResult, setCoor, searchCities, recentSearch, searchResultLoading } = useWeather();
    const [query, setQuery] = useState("");
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const inputRef = useRef(null);
    const searchIconRef = useRef(null);
    const mapPinIconRef = useRef(null);

    useEffect(() => {
        if (searchResult.length) {
            setIsResultOpen(true);
        } else {
            setIsResultOpen(false);
        }
    }, [searchResult]);

    useEffect(() => {
        if (!query) setSearchResult([]);
    }, [query]);

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
            <div className="flex flex-col items-center gap-10 w-full">
                <CloudRainIcon className="text-primary-accent h-21 w-21 max-xs:h-16 max-xs:w-16" />
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-5xl whitespace-nowrap max-xs:text-4xl">Weather Forecast</h1>
                    <h2 className="text-muted-text text-xl text-center max-xs:text-lg">
                        Search for a city or use your current location
                    </h2>
                </div>

                <div className={`flex w-full max-w-180 gap-3 max-sm:flex-col max-sm:gap-4`}>
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
                                className={`p-1.5 hover:text-primary-accent cursor-pointer transition-colors-opacity duration-150 ease ${query ? "visible" : "hidden"}`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div
                            className={`z-20 absolute w-full mt-1 bg-input-bg border border-primary-border rounded-lg overflow-y-scroll transition-opacity-height duration-300 ease ${isResultOpen ? "opacity-100 max-h-55" : "opacity-0 max-h-0"}`}
                        >
                            {searchResult.map((city) => (
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
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 max-sm:w-full">
                        <button
                            onMouseEnter={() => searchIconRef.current?.startAnimation()}
                            onMouseLeave={() => searchIconRef.current?.stopAnimation()}
                            onClick={() => {
                                if (query !== "") searchCities(query);
                            }}
                            disabled={locationLoading || searchResultLoading}
                            className={`flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden px-3 py-1.5 rounded-lg transition-colors duration-300 ease max-sm:w-full ${searchResultLoading ? "bg-primary-accent cursor-not-allowed" : "bg-primary-accent hover:bg-accent-hover cursor-pointer"}`}
                        >
                            {searchResultLoading && (
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-secondary-shimmer to-transparent" />
                            )}
                            <SearchIcon ref={searchIconRef} size={16} className="z-10" />
                            <span className="z-10">{searchResultLoading ? "Searching..." : "Search"}</span>
                        </button>

                        <button
                            onMouseEnter={() => mapPinIconRef.current?.startAnimation()}
                            onMouseLeave={() => mapPinIconRef.current?.stopAnimation()}
                            onClick={handleLocation}
                            disabled={locationLoading || searchResultLoading}
                            className={`flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden px-3 py-1.5 rounded-lg transition-colors duration-300 ease max-sm:w-full ${locationLoading ? "bg-secondary-bg cursor-not-allowed" : "bg-secondary-bg hover:bg-dark-hover cursor-pointer"}`}
                        >
                            {locationLoading && (
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                            )}
                            <MapPinIcon ref={mapPinIconRef} size={16} className="z-10" />
                            <span className="z-10">{locationLoading ? "Locating..." : "Location"}</span>
                        </button>
                    </div>
                </div>

                <div className={`mr-auto w-full ${recentSearch.length > 0 ? "opacity-100" : "opacity-0"}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="h-5 w-5 text-secondary-text" />
                        <h2 className="text-xl">Recent Searches</h2>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-6">
                        {recentSearch.map((cityId, index) => (
                            <RecentSearch key={cityId} cityId={cityId} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
