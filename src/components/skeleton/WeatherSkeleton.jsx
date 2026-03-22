import React from "react";

const WeatherSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 bg-linear-to-br from-slate-800 to-slate-900 border border-primary-border rounded-lg p-8 max-sm:py-4">
            <section className="flex justify-between max-xs:flex-col gap-10 max-sm:items-center">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-1 max-[480px]:items-center">
                        <div className="relative bg-secondary-bg rounded-lg h-7 w-40 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                        </div>

                        <div className="relative bg-secondary-bg rounded-lg h-6 w-25 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-fit max-sm:w-full items-center">
                        <div className="relative bg-secondary-bg rounded-lg h-13 w-18 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                        </div>

                        <div className="relative bg-secondary-bg rounded-lg h-6 w-25 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="relative bg-secondary-bg rounded-lg h-22 w-28 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>
            </section>

            <hr className="border-primary-border mt-6" />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(95px,1fr))] place-items-center gap-12 max-xs:gap-6">
                <div className="flex items-center gap-2">
                    <div className="relative bg-secondary-bg rounded-lg h-15 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative bg-secondary-bg rounded-lg h-15 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative bg-secondary-bg rounded-lg h-15 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative bg-secondary-bg rounded-lg h-15 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative bg-secondary-bg rounded-lg h-15 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary-shimmer to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherSkeleton;
