import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Types
interface Country {
    id: number;
    name: string;
    flag: string;
    flagImage: string;
    capital: string;
    position: [number, number]; // [latitude, longitude]
}

// Country data with geographic coordinates
const countries: Country[] = [
    {
        id: 1,
        name: "O'zbekiston",
        flag: "🇺🇿",
        flagImage: "https://flagcdn.com/w320/uz.png",
        capital: "Toshkent",
        position: [41.2995, 69.2401],
    },
    {
        id: 2,
        name: "Qozog'iston",
        flag: "🇰🇿",
        flagImage: "https://flagcdn.com/w320/kz.png",
        capital: "Ostona",
        position: [51.1694, 71.4491],
    },
    {
        id: 3,
        name: "Qirg'iziston",
        flag: "🇰🇬",
        flagImage: "https://flagcdn.com/w320/kg.png",
        capital: "Bishkek",
        position: [42.8746, 74.5698],
    },
    {
        id: 4,
        name: "Turkmaniston",
        flag: "🇹🇲",
        flagImage: "https://flagcdn.com/w320/tm.png",
        capital: "Ashxobod",
        position: [37.9601, 58.3261],
    },
    {
        id: 5,
        name: "Tojikiston",
        flag: "🇹🇯",
        flagImage: "https://flagcdn.com/w320/tj.png",
        capital: "Dushanbe",
        position: [38.5598, 68.787],
    },
    {
        id: 6,
        name: "Afg'oniston",
        flag: "🇦🇫",
        flagImage: "https://flagcdn.com/w320/af.png",
        capital: "Kobul",
        position: [34.5553, 69.2075],
    },
];

// Custom icon for markers
const createCustomIcon = (flagImage: string) => {
    return L.divIcon({
        html: `
            <div style="
                background-image: url('${flagImage}');
                background-size: cover;
                width: 30px;
                height: 20px;
                border: 2px solid white;
                border-radius: 3px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            "></div>
        `,
        className: "custom-flag-marker",
        iconSize: [30, 20],
        iconAnchor: [15, 10],
    });
};

// Map controller component
const MapController: React.FC<{ activeCountry: Country | null }> = ({
    activeCountry,
}) => {
    const map = useMap();

    useEffect(() => {
        if (activeCountry) {
            map.flyTo(activeCountry.position, 6, {
                duration: 2,
            });
        }
    }, [activeCountry, map]);

    return null;
};

const HomeOsiyo_temp2: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<number>(1);
    const [activeCountry, setActiveCountry] = useState<number>(1);

    const selectedCountryData = countries.find((c) => c.id === selectedCountry);
    const activeCountryData = countries.find((c) => c.id === activeCountry);

    // Auto-rotate countries
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCountry((prev) => (prev % countries.length) + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Markaziy Osiyo markazi
    const mapCenter: [number, number] = [41.2044, 64.625];

    // Markaziy Osiyo chegaralari
    const maxBounds: L.LatLngBoundsExpression = [
        [30.0, 46.0], // Janubi-G'arbiy burchak
        [55.0, 87.0], // Shimoli-Sharqiy burchak
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-center">
                        Markaziy Osiyo Xaritasi
                    </h1>
                    <p className="text-center text-blue-100 mt-1">
                        Faqat Markaziy Osiyo mintaqasi
                    </p>
                </div>
            </header>

            <div className="flex min-h-screen pt-20">
                {/* Sidebar */}
                <aside className="w-80 bg-white shadow-xl z-40 border-r border-gray-200 fixed left-0 top-20 bottom-0 overflow-y-auto">
                    <nav className="p-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2 flex items-center">
                            <span className="mr-2">🏴</span>
                            Davlatlar Xaritada
                        </h2>
                        <ul className="space-y-3">
                            {countries.map((country) => (
                                <li key={country.id}>
                                    <button
                                        onClick={() =>
                                            setSelectedCountry(country.id)
                                        }
                                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 border-2 ${
                                            selectedCountry === country.id
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105"
                                                : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={country.flagImage}
                                            alt={`${country.name} bayrog'i`}
                                            className="w-8 h-6 object-cover rounded shadow-sm"
                                        />
                                        <div className="text-left flex-1">
                                            <div className="font-medium">
                                                {country.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {country.capital}
                                            </div>
                                        </div>
                                        <span className="text-xl">
                                            {country.flag}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Selected Country Info */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                            <h3 className="font-semibold text-blue-800 mb-2 text-center">
                                Tanlangan Davlat:
                            </h3>
                            {selectedCountryData && (
                                <div className="text-center">
                                    <img
                                        src={selectedCountryData.flagImage}
                                        alt="Selected flag"
                                        className="w-16 h-12 object-cover rounded mx-auto mb-2 shadow-md"
                                    />
                                    <div className="font-bold text-blue-900">
                                        {selectedCountryData.name}
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        Poytaxt: {selectedCountryData.capital}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Active Country Info */}
                        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-green-800 font-medium">
                                    Avtomatik aylanish:
                                </span>
                                {activeCountryData && (
                                    <span className="font-bold text-green-900">
                                        {activeCountryData.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </nav>
                </aside>

                {/* Main Content - Leaflet Map */}
                <main className="flex-1 ml-80 p-4 relative">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full">
                        <MapContainer
                            center={mapCenter}
                            zoom={5}
                            style={{ height: "100%", width: "100%" }}
                            scrollWheelZoom={true}
                            minZoom={4}
                            maxZoom={10}
                            maxBounds={maxBounds}
                            maxBoundsViscosity={1.0}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                noWrap={true}
                                bounds={maxBounds}
                            />

                            {/* Country Markers */}
                            {countries.map((country) => (
                                <Marker
                                    key={country.id}
                                    position={country.position}
                                    icon={createCustomIcon(country.flagImage)}
                                >
                                    <Popup>
                                        <div className="text-center">
                                            <img
                                                src={country.flagImage}
                                                alt={`${country.name} bayrog'i`}
                                                className="w-20 h-14 object-cover rounded mx-auto mb-2"
                                            />
                                            <h3 className="font-bold text-lg">
                                                {country.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                Poytaxt: {country.capital}
                                            </p>
                                            <div className="text-2xl mt-1">
                                                {country.flag}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setSelectedCountry(
                                                        country.id
                                                    )
                                                }
                                                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                            >
                                                Tanlash
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                            {/* Map Controller for auto-rotation */}
                            <MapController
                                activeCountry={activeCountryData || null}
                            />
                        </MapContainer>
                    </div>

                    {/* Map Controls Info */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                        <h4 className="font-bold text-gray-800 mb-2">
                            Xarita Boshqaruvi
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Faqat Markaziy Osiyo ko'rinadi</li>
                            <li>• Boshqa mintaqalarga o'tish cheklangan</li>
                            <li>• Marker bosish: Ma'lumot olish</li>
                        </ul>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 animate-float">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                            🗺️ Markaziy Osiyo
                        </div>
                    </div>
                </main>
            </div>

            {/* Custom CSS */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float {
                    animation: float 2s ease-in-out infinite;
                }
                
                /* Leaflet marker styles */
                .custom-flag-marker {
                    background: transparent !important;
                    border: none !important;
                }
                
                /* Xarita chegaralari uchun */
                .leaflet-container {
                    border-radius: 1rem;
                }
            `}</style>
        </div>
    );
};

export default HomeOsiyo_temp2;
