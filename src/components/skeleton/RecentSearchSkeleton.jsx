import { useWeather } from "@/contexts/WeatherContext";

const RecentSearchSkeleton = () => {
    const { recentSearch } = useWeather();

    return (
        <div
            className={`flex flex-col w-full gap-8 p-4 border border-primary-border rounded-lg bg-primary-bg ${recentSearch.length === 1 && "xs:max-w-[50%]"}`}
        >
            <div className="flex justify-between gap-2">
                <div className="flex flex-col gap-1">
                    {/* City */}
                    <div className="relative bg-secondary-bg rounded-lg h-5 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                    {/* Country */}
                    <div className="relative bg-secondary-bg rounded-lg h-5 w-15 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>

                {/* Icon */}
                <div className="relative bg-secondary-bg rounded-lg h-10 w-12 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                </div>
            </div>

            <div className="flex flex-col gap-1 items-start">
                {/* Temp */}
                <div className="relative bg-secondary-bg rounded-lg h-7 w-10 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                </div>

                {/* Description */}
                <div className="relative bg-secondary-bg rounded-lg h-5 w-20 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                </div>
            </div>
        </div>
    );
};

export default RecentSearchSkeleton;
