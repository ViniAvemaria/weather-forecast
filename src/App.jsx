import { motion, AnimatePresence } from "motion/react";
import Search from "./components/search";
import Weather from "./components/Weather";
import { useWeather } from "./contexts/WeatherContext";

function App() {
    const { coor } = useWeather();

    return (
        <div className="text-primary-text bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-dvh min-w-90">
            <main className="max-w-275 mx-auto px-8 max-sm:px-6">
                <AnimatePresence mode="wait">
                    {!coor.lat && !coor.lon ? (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Search />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="weather"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Weather />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
