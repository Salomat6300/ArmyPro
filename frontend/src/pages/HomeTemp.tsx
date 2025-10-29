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
    position: [number, number];
    population?: string;
    area?: string;
    language?: string;
    currency?: string;
    president?: string;
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
        population: "35 million",
        area: "448,978 km²",
        language: "O'zbek tili",
        currency: "So'm",
        president: "Shavkat Mirziyoyev",
    },
    {
        id: 2,
        name: "Qozog'iston",
        flag: "🇰🇿",
        flagImage: "https://flagcdn.com/w320/kz.png",
        capital: "Nur-Sulton",
        position: [51.1694, 71.4491],
        population: "19 million",
        area: "2,724,900 km²",
        language: "Qozoq tili",
        currency: "Tenge",
        president: "Kassym-Jomart Tokayev",
    },
    {
        id: 3,
        name: "Qirg'iziston",
        flag: "🇰🇬",
        flagImage: "https://flagcdn.com/w320/kg.png",
        capital: "Bishkek",
        position: [42.8746, 74.5698],
        population: "6.6 million",
        area: "199,951 km²",
        language: "Qirg'iz tili",
        currency: "Som",
        president: "Sadyr Japarov",
    },
    {
        id: 4,
        name: "Turkmaniston",
        flag: "🇹🇲",
        flagImage: "https://flagcdn.com/w320/tm.png",
        capital: "Ashxobod",
        position: [37.9601, 58.3261],
        population: "6.2 million",
        area: "488,100 km²",
        language: "Turkman tili",
        currency: "Manat",
        president: "Serdar Berdimuhamedow",
    },
    {
        id: 5,
        name: "Tojikiston",
        flag: "🇹🇯",
        flagImage: "https://flagcdn.com/w320/tj.png",
        capital: "Dushanbe",
        position: [38.5598, 68.787],
        population: "9.5 million",
        area: "143,100 km²",
        language: "Tojik tili",
        currency: "Somoni",
        president: "Emomali Rahmon",
    },
    {
        id: 6,
        name: "Afg'oniston",
        flag: "🇦🇫",
        flagImage:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/330px-Flag_of_the_Taliban.svg.png",
        capital: "Kobul",
        position: [34.5553, 69.2075],
        population: "38 million",
        area: "652,230 km²",
        language: "Dari, Pashtu",
        currency: "Afg'oniy",
        president: "Hibatullah Akhundzada",
    },
];

// Custom icon for markers
const createCustomIcon = (
    flagImage: string,
    countryName: string,
    isActive: boolean
) => {
    return L.divIcon({
        html: `
            <div style="
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            ">
                <div style="
                    background-image: url('${flagImage}');
                    background-size: cover;
                    width: 60px;
                    height: 35px;
                    border: 3px solid ${isActive ? "#3b82f6" : "white"};
                    border-radius: 4px;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                    margin-bottom: 4px;
                    transition: all 0.3s ease;
                "></div>
                <div style="
                    background: ${isActive ? "#3b82f6" : "white"};
                    color: ${isActive ? "white" : "#333"};
                    padding: 2px 6px;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: bold;
                    white-space: nowrap;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                ">${countryName}</div>
            </div>
        `,
        className: "custom-flag-marker",
        iconSize: [60, 45],
        iconAnchor: [30, 40],
    });
};

// Custom popup for hover - YANGILANGAN CHIROYLI DIZAYN
const CustomPopup: React.FC<{
    country: Country;
    position: { top: number; left: number };
}> = ({ country, position }) => {
    return (
        <div
            className="bg-white rounded-2xl shadow-2xl p-6 min-w-[320px] border border-blue-100 absolute z-[1000] backdrop-blur-sm bg-white/95"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
        >
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 -mx-4 -mt-4 mb-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src={country.flagImage}
                            alt={`${country.name} bayrog'i`}
                            className="w-12 h-8 object-cover rounded-lg shadow-lg border-2 border-white"
                        />
                        <div>
                            <h3 className="font-bold text-lg">
                                {country.name}
                            </h3>
                            <div className="text-blue-100 text-sm">
                                {country.capital}
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl">{country.flag}</div>
                </div>
            </div>

            {/* Statistics grid with modern design */}
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    {/* Population */}
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-sm">
                                    👥
                                </span>
                            </div>
                            <div>
                                <div className="text-xs text-blue-600 font-semibold">
                                    Aholi
                                </div>
                                <div className="text-sm font-bold text-gray-800">
                                    {country.population}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Area */}
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-sm">
                                    🗺️
                                </span>
                            </div>
                            <div>
                                <div className="text-xs text-blue-600 font-semibold">
                                    Maydon
                                </div>
                                <div className="text-sm font-bold text-gray-800">
                                    {country.area}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-blue-600 text-sm">💬</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-blue-600 font-semibold">
                                Rasmiy til
                            </div>
                            <div className="text-sm font-bold text-gray-800">
                                {country.language}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Currency and President in row */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Currency */}
                    <div className="bg-white rounded-xl p-3 border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xs">
                                    💰
                                </span>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 font-medium">
                                    Valyuta
                                </div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {country.currency}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* President */}
                    <div className="bg-white rounded-xl p-3 border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-xs">
                                    👑
                                </span>
                            </div>
                            <div>
                                <div className="text-xs text-gray-600 font-medium">
                                    Prezident
                                </div>
                                <div
                                    className="text-sm font-semibold text-gray-800 truncate"
                                    title={country.president}
                                >
                                    {country.president}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-300 rounded-full opacity-30"></div>
        </div>
    );
};

// Map controller component
const MapController: React.FC<{ activeCountry: Country | null }> = ({
    activeCountry,
}) => {
    const map = useMap();

    useEffect(() => {
        if (activeCountry) {
            map.flyTo(activeCountry.position, 6, { duration: 1.5 });
        }
    }, [activeCountry, map]);

    return null;
};

// Custom hook for marker hover position
const useMarkerHover = () => {
    const [hoverPosition, setHoverPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    const updateHoverPosition = (markerElement: HTMLElement) => {
        const rect = markerElement.getBoundingClientRect();
        const mapContainer = document.querySelector(
            ".leaflet-container"
        ) as HTMLElement;

        if (mapContainer) {
            const mapRect = mapContainer.getBoundingClientRect();

            // Markerning O'NG YUQORI burchagidan chiqadigan qilish
            const position = {
                top: rect.top - mapRect.top - 320, // Popup balandligiga qarab sozlandi
                left: rect.right - mapRect.left + 10, // Markerning o'ng tomoniga
            };

            setHoverPosition(position);
        }
    };

    return { hoverPosition, updateHoverPosition, setHoverPosition };
};

const Home: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<number>(1);
    const [activeCountry, setActiveCountry] = useState<number>(1);
    const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
    const { hoverPosition, updateHoverPosition, setHoverPosition } =
        useMarkerHover();

    const selectedCountryData = countries.find((c) => c.id === selectedCountry);
    const activeCountryData = countries.find((c) => c.id === activeCountry);

    // Markaziy Osiyo markazi
    const mapCenter: [number, number] = [41.2044, 64.625];

    const handleCountryClick = (countryId: number) => {
        setSelectedCountry(countryId);
        setActiveCountry(countryId);
        setHoveredCountry(null);
        setHoverPosition(null);
    };

    const handleMarkerMouseOver = (
        country: Country,
        event: L.LeafletMouseEvent
    ) => {
        // Faqat aktiv bo'lmagan davlatlar uchun hover ishlaydi
        if (activeCountry !== country.id) {
            const markerElement = event.target.getElement();
            if (markerElement) {
                updateHoverPosition(markerElement);
                setHoveredCountry(country);
            }
        }
    };

    const handleMarkerMouseOut = () => {
        setHoveredCountry(null);
        setHoverPosition(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-center">
                        Markaziy Osiyo Xaritasi
                    </h1>
                    <p className="text-center text-blue-100 mt-1">
                        Leaflet bilan interaktiv xarita
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
                                            handleCountryClick(country.id)
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
                    </nav>
                </aside>

                {/* Main Content - Leaflet Map */}
                <main className="flex-1 ml-80 p-4 relative">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full relative">
                        <MapContainer
                            center={mapCenter}
                            zoom={5}
                            style={{ height: "100%", width: "100%" }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Country Markers */}
                            {countries.map((country) => (
                                <Marker
                                    key={country.id}
                                    position={country.position}
                                    icon={createCustomIcon(
                                        country.flagImage,
                                        country.name,
                                        activeCountry === country.id
                                    )}
                                    eventHandlers={{
                                        click: () =>
                                            handleCountryClick(country.id),
                                        mouseover: (e) =>
                                            handleMarkerMouseOver(country, e),
                                        mouseout: handleMarkerMouseOut,
                                    }}
                                />
                            ))}

                            {/* Map Controller */}
                            <MapController
                                activeCountry={activeCountryData || null}
                            />
                        </MapContainer>

                        {/* Custom Hover Popup - Markerning O'NG YUQORI burchagida */}
                        {hoveredCountry && hoverPosition && (
                            <CustomPopup
                                country={hoveredCountry}
                                position={hoverPosition}
                            />
                        )}
                    </div>
                </main>
            </div>

            {/* Custom CSS */}
            <style>{`
                /* Leaflet marker styles */
                .custom-flag-marker {
                    background: transparent !important;
                    border: none !important;
                }
                
                /* Marker hover effect */
                .leaflet-marker-icon:hover {
                    z-index: 1000 !important;
                }

                /* Smooth transitions for popup */
                .bg-white\\/95 {
                    background-color: rgba(255, 255, 255, 0.95);
                }

                /* Custom scrollbar for sidebar */
                aside::-webkit-scrollbar {
                    width: 6px;
                }

                aside::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }

                aside::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }

                aside::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </div>
    );
};

export default Home;
