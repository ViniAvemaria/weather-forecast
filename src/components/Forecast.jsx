import { iconMap } from "@/utils/weatherIcon";

const Forecast = ({ day }) => {
    const weekDay = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
    });

    const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });

    const isTomorrow = new Date(day.dt * 1000).toDateString() === new Date(Date.now() + 86400000).toDateString();

    const Icon = iconMap[day?.weather?.[0]?.icon];

    return (
        <div className="flex flex-col w-full gap-8 items-center border border-primary-border py-6 max-sm:py-4 rounded-lg bg-primary-bg">
            <h2 className="text-lg">{isTomorrow ? "Tomorrow" : weekDay}</h2>
            <h3 className="text-muted-text text-sm">{date}</h3>
            <Icon className="w-15 h-15" />
            <p className="text-secondary-text capitalize">{day.weather[0].description}</p>
            <div className="flex gap-4 text-lg">
                <p>{`${Math.round(day.main.temp_max)}°`}</p>
                <p className="text-muted-text">{`${Math.round(day.main.temp_min)}°`}</p>
            </div>
        </div>
    );
};

export default Forecast;
