import { useWeather } from "@/contexts/WeatherContext";
import { Droplets, Wind, Eye, Gauge, Clock } from "lucide-react";
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

    return (
        <div className="flex flex-col gap-10 pb-16">
            <Header />

            {!weatherLoading && (
                <div className="flex flex-col gap-6 bg-linear-to-br from-slate-800 to-slate-900 border border-primary-border rounded-lg p-8">
                    <section className="flex justify-between">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-0.5">
                                <h2 className="font-semibold text-3xl">{weather.name}</h2>
                                <h3 className="text-secondary-text">{countries.getName(weather.sys.country, "en")}</h3>
                            </div>

                            <div className="flex flex-col gap-1 w-fit">
                                <h2 className="text-6xl text-center">{`${Math.round(weather.main.temp)}°`}</h2>
                                <h3 className="text-secondary-text text-xl">{`Feels like ${Math.round(weather.main.feels_like)}°`}</h3>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <Icon className="w-20 h-20" />
                            <p className="capitalize text-lg text-secondary-text">{weather.weather[0].description}</p>
                        </div>
                    </section>

                    <hr className="border-primary-border mt-6" />

                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Droplets className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text">Humidity</p>
                                <p className="text-lg">{`${weather.main.humidity}%`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Wind className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text">Wind Speed</p>
                                <p className="text-lg">{`${Math.round(weather.wind.speed * 3.6)} km/h`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text">Visibility</p>
                                <p className="text-lg">{`${weather.visibility / 1000} km`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Gauge className="h-5 w-5" />
                            <div>
                                <p className="text-secondary-text">Pressure</p>
                                <p className="text-lg">{`${weather.main.pressure} mb`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!forecastLoading && (
                <div>
                    <h2 className="text-2xl mb-6">5-Day Forecast</h2>

                    <div className="flex gap-6 overflow-x-scroll">
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

                <div className="flex gap-6 overflow-x-scroll">
                    {recentSearch.map((cityId, index) => (
                        <RecentSearch key={cityId} cityId={cityId} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Weather;
