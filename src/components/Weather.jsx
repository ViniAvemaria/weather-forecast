import { useWeather } from "@/contexts/WeatherContext";
import { Droplets, Wind, Eye, Sunrise, Sunset, Clock } from "lucide-react";
import Header from "./Header";
import Forecast from "./Forecast";
import RecentSearch from "./RecentSearch";
import { iconMap } from "@/utils/weatherIcon";
import en from "i18n-iso-countries/langs/en.json";
import countries from "i18n-iso-countries";
countries.registerLocale(en);

const Weather = () => {
    const { weather, forecast, weatherLoading, forecastLoading, recentSearch } = useWeather();

    const Icon = iconMap[weather?.weather?.[0]?.icon];

    const daily = forecast?.list?.filter((item) => item.dt_txt?.includes("12:00:00"));

    const formatTime = (ts) =>
        new Date(ts * 1000).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        });

    return (
        <div className="flex flex-col gap-10 pb-16">
            <Header />

            {!weatherLoading && (
                <div className="flex flex-col gap-6 bg-linear-to-br from-slate-800 to-slate-900 border border-primary-border rounded-lg p-8 max-sm:py-4">
                    <section className="flex justify-between max-xs:flex-col gap-10 max-sm:items-center">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-0.5">
                                <h2 className="font-semibold text-3xl max-sm:text-2xl max-sm:text-center">
                                    {weather.name}
                                </h2>
                                <h3 className="text-secondary-text max-sm:text-center">
                                    {countries.getName(weather.sys.country, "en")}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-1 w-fit max-sm:w-full items-center">
                                <h2 className="text-6xl text-center max-sm:text-5xl">{`${Math.round(weather.main.temp)}°`}</h2>
                                <h3 className="text-secondary-text text-xl max-sm:text-lg">{`Feels like ${Math.round(weather.main.feels_like)}°`}</h3>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <Icon className="w-20 h-20 max-sm:w-16 max-sm:h-16" />
                            <p className="capitalize text-center text-lg text-secondary-text max-sm:text-base">
                                {weather.weather[0].description}
                            </p>
                        </div>
                    </section>

                    <hr className="border-primary-border mt-6" />

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(95px,1fr))] place-items-center gap-12 max-xs:gap-6">
                        <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text">Humidity</p>
                                <p>{`${weather.main.humidity}%`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Wind className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text whitespace-nowrap">Wind Speed</p>
                                <p>{`${Math.round(weather.wind.speed * 3.6)} km/h`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text">Visibility</p>
                                <p>{`${weather.visibility / 1000} km`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Sunrise className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text whitespace-nowrap">Sun Rise</p>
                                <p>{`${formatTime(weather.sys.sunrise)}`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Sunset className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text whitespace-nowrap">Sun Set</p>
                                <p>{`${formatTime(weather.sys.sunset)}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!forecastLoading && (
                <div>
                    <h2 className="text-2xl mb-6">5-Day Forecast</h2>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-6">
                        {daily.map((day) => (
                            <Forecast key={day.dt} day={day} />
                        ))}
                    </div>
                </div>
            )}

            <div>
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
    );
};

export default Weather;
