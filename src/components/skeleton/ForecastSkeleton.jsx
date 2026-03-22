import React from "react";

const ForecastingSkeleton = () => {
    return (
        <div className="flex flex-col w-full gap-8 items-center border border-primary-border py-6 max-sm:py-4 rounded-lg bg-primary-bg">
            {/* Week Day */}
            <div className="relative bg-secondary-bg rounded-lg h-6 w-20 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
            </div>

            <div className="relative bg-secondary-bg rounded-lg h-5 w-15 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
            </div>

            <div className="relative bg-secondary-bg rounded-lg h-15 w-20 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
            </div>

            <div className="relative bg-secondary-bg rounded-lg h-5 w-20 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
            </div>

            <div className="relative bg-secondary-bg rounded-lg h-5 w-17 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
            </div>
        </div>
    );
};

export default ForecastingSkeleton;
