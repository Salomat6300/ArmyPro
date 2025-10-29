import React, { useState, useEffect } from "react";

// Types
interface Country {
    id: number;
    name: string;
    flag: string;
    color: string;
    flagImage: string;
}

// Country data with real flag images
const countries: Country[] = [
    {
        id: 1,
        name: "O'zbekiston",
        flag: "🇺🇿",
        color: "bg-gradient-to-r from-blue-500 to-green-500 to-white to-green-500",
        flagImage: "https://flagcdn.com/w320/uz.png",
    },
    {
        id: 2,
        name: "Qozog'iston",
        flag: "🇰🇿",
        color: "bg-gradient-to-b from-blue-500 to-yellow-500",
        flagImage: "https://flagcdn.com/w320/kz.png",
    },
    {
        id: 3,
        name: "Qirg'iziston",
        flag: "🇰🇬",
        color: "bg-gradient-to-b from-red-500 to-yellow-500",
        flagImage: "https://flagcdn.com/w320/kg.png",
    },
    {
        id: 4,
        name: "Turkmaniston",
        flag: "🇹🇲",
        color: "bg-gradient-to-r from-green-500 to-white to-red-500",
        flagImage: "https://flagcdn.com/w320/tm.png",
    },
    {
        id: 5,
        name: "Tojikiston",
        flag: "🇹🇯",
        color: "bg-gradient-to-b from-red-500 to-white to-green-500",
        flagImage: "https://flagcdn.com/w320/tj.png",
    },
    {
        id: 6,
        name: "Afg'oniston",
        flag: "🇦🇫",
        color: "bg-gradient-to-r from-black to-red-500 to-green-500",
        flagImage: "https://flagcdn.com/w320/af.png",
    },
];

const HomeOsiyo_temp1: React.FC = () => {
    const [activeCountry, setActiveCountry] = useState<number>(1);

    // Auto-rotate countries
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCountry((prev) => (prev % countries.length) + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-center">
                        Markaziy Osiyo Davlatlari
                    </h1>
                    <p className="text-center text-blue-100 mt-1">
                        O'rta Osiyo davlatlarining bayroqlari
                    </p>
                </div>
            </header>

            <div className="flex h-screen pt-16">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-xl z-40 border-r border-gray-200">
                    <nav className="p-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center">
                            <span className="mr-2">🏴</span>
                            Davlatlar Bayroqlari
                        </h2>
                        <ul className="space-y-3">
                            {countries.map((country) => (
                                <li key={country.id}>
                                    <button
                                        onClick={() =>
                                            setActiveCountry(country.id)
                                        }
                                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 border-2 ${
                                            activeCountry === country.id
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105"
                                                : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={country.flagImage}
                                            alt={`${country.name} bayrog'i`}
                                            className="w-8 h-6 object-cover rounded shadow-sm"
                                        />
                                        <span className="font-medium text-left flex-1">
                                            {country.name}
                                        </span>
                                        <span className="text-xl">
                                            {country.flag}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content - Map Area */}
                <main className="flex-1 p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-green-50/50">
                    {/* Animated Background Flags */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        {countries.map((country, index) => (
                            <div
                                key={country.id}
                                className={`absolute rounded-lg transition-all duration-1000 ${
                                    activeCountry === country.id
                                        ? "opacity-30 scale-110"
                                        : "opacity-10 scale-100"
                                }`}
                                style={{
                                    width: `${120 + index * 30}px`,
                                    height: `${80 + index * 20}px`,
                                    top: `${15 + index * 12}%`,
                                    left: `${25 + index * 6}%`,
                                    backgroundImage: `url(${country.flagImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    transform: `rotate(${
                                        index * 15
                                    }deg) scale(${
                                        activeCountry === country.id ? 1.3 : 1
                                    })`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Central Asia Map Container */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40 w-full max-w-6xl">
                            {/* Map Visualization with Flags */}
                            <div className="relative w-full mx-auto">
                                {/* Countries Grid with Real Flags */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {countries.map((country) => (
                                        <div
                                            key={country.id}
                                            className={`relative group cursor-pointer transform transition-all duration-700 ${
                                                activeCountry === country.id
                                                    ? "scale-110 rotate-2 z-20"
                                                    : "scale-95 opacity-80 hover:scale-105 hover:opacity-100"
                                            }`}
                                            onClick={() =>
                                                setActiveCountry(country.id)
                                            }
                                        >
                                            {/* Country Flag Card */}
                                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                                                <img
                                                    src={country.flagImage}
                                                    alt={`${country.name} bayrog'i`}
                                                    className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />

                                                {/* Country Name Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                    <h3 className="font-bold text-white text-sm md:text-base text-center drop-shadow-lg">
                                                        {country.name}
                                                    </h3>
                                                </div>

                                                {/* Emoji Indicator */}
                                                <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-lg">
                                                    <span className="text-lg">
                                                        {country.flag}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* 3D Hover Effect */}
                                            <div
                                                className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                                                    activeCountry === country.id
                                                        ? "shadow-2xl bg-gradient-to-br from-blue-500/20 to-transparent"
                                                        : "group-hover:shadow-xl"
                                                }`}
                                                style={{
                                                    transform:
                                                        activeCountry ===
                                                        country.id
                                                            ? "perspective(1000px) rotateY(5deg) rotateX(3deg) translateZ(10px)"
                                                            : "none",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Active Country Display */}
                                <div className="mt-8 md:mt-12 text-center">
                                    <div className="inline-block bg-white/95 backdrop-blur-lg rounded-3xl px-6 md:px-8 py-4 md:py-6 shadow-2xl border border-white/40">
                                        <div className="flex items-center justify-center space-x-4 mb-3">
                                            <img
                                                src={
                                                    countries.find(
                                                        (c) =>
                                                            c.id ===
                                                            activeCountry
                                                    )?.flagImage
                                                }
                                                alt="Active country flag"
                                                className="w-12 h-8 md:w-16 md:h-12 object-cover rounded shadow-lg border"
                                            />
                                            <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                                                {
                                                    countries.find(
                                                        (c) =>
                                                            c.id ===
                                                            activeCountry
                                                    )?.name
                                                }
                                            </h2>
                                            <span className="text-3xl md:text-4xl animate-pulse">
                                                {
                                                    countries.find(
                                                        (c) =>
                                                            c.id ===
                                                            activeCountry
                                                    )?.flag
                                                }
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm md:text-base">
                                            Markaziy Osiyoning qadrdon davlati
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Info Elements */}
                    <div className="absolute top-4 md:top-8 right-4 md:right-8 animate-float">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm">
                            🏔️ Markaziy Osiyo
                        </div>
                    </div>

                    <div
                        className="absolute bottom-4 md:bottom-8 left-4 md:left-8 animate-float"
                        style={{ animationDelay: "1.5s" }}
                    >
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm">
                            🌍 6 Davlat
                        </div>
                    </div>
                </main>
            </div>

            {/* Custom CSS for floating animation */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default HomeOsiyo_temp1;
