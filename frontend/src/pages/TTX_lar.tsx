import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Vehicle, Country } from "../types";

import {
    vehicles,
    countries,
} from "C:/Users/fuugo/Desktop/ArmyPro/frontend/data/BazaTTX";

const Ttxlar: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        null
    );
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
        {}
    );

    useEffect(() => {
        const uzbekistan = countries[0];
        if (uzbekistan) {
            handleCountrySelect(uzbekistan);
        }
    }, []);

    const handleCountrySelect = (country: Country) => {
        setIsLoading(true);
        setSelectedCountry(country);

        setTimeout(() => {
            const countryVehicles = vehicles.filter(
                (vehicle) => vehicle.country === country.id
            );
            setFilteredVehicles(countryVehicles);
            setIsLoading(false);
        }, 800);
    };

    const handleVehicleClick = (vehicle: Vehicle) => {
        navigate(`/vehicle/${vehicle.id}`);
    };

    const handleFlagError = (vehicleId: string) => {
        setImageErrors((prev) => ({ ...prev, [vehicleId]: true }));
    };

    const filteredVehiclesBySearch = filteredVehicles.filter(
        (vehicle) =>
            vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.specifications.manufacturer
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const filteredByType =
        filterType === "all"
            ? filteredVehiclesBySearch
            : filteredVehiclesBySearch.filter((vehicle) =>
                  vehicle.type.toLowerCase().includes(filterType.toLowerCase())
              );

    const vehicleTypes = [...new Set(vehicles.map((v) => v.type))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Header Section */}
            <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
                {/* Hero Section */}
                <div className="text-start container mx-auto px-4 py-4">
                    <h1 className="text-4xl font-bold mb-1 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        O'zbekiston Havo Texnika Modellari
                    </h1>
                </div>

                {/* Search and Filter Section */}
                <div className="container mx-auto px-4 pb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search Box */}
                        <div className="w-full lg:w-96">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Qidirish..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        className="w-5 h-5 text-blue-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Filter by Type */}
                        <div className="w-full lg:w-64">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            >
                                <option value="all" className="bg-slate-800">
                                    Barcha turlar
                                </option>
                                {vehicleTypes.map((type) => (
                                    <option
                                        key={type}
                                        value={type}
                                        className="bg-slate-800"
                                    >
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 text-white">
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {filteredVehicles.length}
                                </div>
                                <div className="text-sm text-blue-200">
                                    Jami
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {
                                        filteredVehicles.filter(
                                            (v) =>
                                                v.specifications.status ===
                                                "Faol"
                                        ).length
                                    }
                                </div>
                                <div className="text-sm text-blue-200">
                                    Faol
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {filteredByType.length}
                                </div>
                                <div className="text-sm text-blue-200">
                                    Ko'rsatilmoqda
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                            <div className="text-white text-lg">
                                Texnika modellari yuklanmoqda...
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Results Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                            <div className="text-white">
                                <div className="text-lg">
                                    Topilgan:{" "}
                                    <span className="font-bold text-blue-300">
                                        {filteredByType.length}
                                    </span>{" "}
                                    ta texnika
                                    {searchTerm && (
                                        <span className="text-blue-200">
                                            {" "}
                                            ("{searchTerm}" bo'yicha)
                                        </span>
                                    )}
                                    {filterType !== "all" && (
                                        <span className="text-blue-200">
                                            {" "}
                                            ({filterType} turi)
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Active Filters */}
                            <div className="flex flex-wrap gap-2">
                                {searchTerm && (
                                    <div className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {searchTerm}
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="hover:text-white transition-colors"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                                {filterType !== "all" && (
                                    <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                        {filterType}
                                        <button
                                            onClick={() => setFilterType("all")}
                                            className="hover:text-white transition-colors"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Vehicles Grid */}
                        {filteredByType.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                {filteredByType.map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        onClick={() =>
                                            handleVehicleClick(vehicle)
                                        }
                                        className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-white/10 hover:border-blue-400/30 relative flex flex-col h-full"
                                    >
                                        {/* Manufacturer Country Flag */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className="w-10 h-7 rounded-md overflow-hidden shadow-lg border border-white/20 bg-white">
                                                {imageErrors[vehicle.id] ? (
                                                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold">
                                                        {vehicle.manufacturerCountry
                                                            ?.substring(0, 3)
                                                            .toUpperCase() ||
                                                            "FLAG"}
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={
                                                            vehicle.manufacturerCountryFlag
                                                        }
                                                        alt={
                                                            vehicle.manufacturerCountry
                                                        }
                                                        className="w-full h-full object-cover"
                                                        onError={() =>
                                                            handleFlagError(
                                                                vehicle.id
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Image Section */}
                                        <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-500 to-blue-600"></div>
                                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                                <img
                                                    src={vehicle.image}
                                                    alt={vehicle.name}
                                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                                                    onError={(e) => {
                                                        e.currentTarget.src = `https://via.placeholder.com/400x300/1e3a8a/ffffff?text=${encodeURIComponent(
                                                            vehicle.name
                                                        )}`;
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                                    {vehicle.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section - flex-grow bilan qolgan joyni egallaydi */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            {/* Title and Description */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
                                                    {vehicle.name}
                                                </h3>
                                                <p className="text-blue-200 text-sm line-clamp-2">
                                                    {vehicle.shortDescription}
                                                </p>
                                            </div>

                                            {/* Specifications - flex-grow bilan qolgan joyni egallaydi */}
                                            <div className="space-y-3 flex-grow">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-blue-300 text-sm">
                                                        Ishlab chiqaruvchi:
                                                    </span>
                                                    <span className="text-white text-sm font-medium text-right">
                                                        {
                                                            vehicle
                                                                .specifications
                                                                .manufacturer
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-blue-300 text-sm">
                                                        Birinchi parvoz:
                                                    </span>
                                                    <span className="text-white text-sm font-medium">
                                                        {
                                                            vehicle
                                                                .specifications
                                                                .firstFlight
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-blue-300 text-sm">
                                                        Ekipaj:
                                                    </span>
                                                    <span className="text-white text-sm font-medium">
                                                        {
                                                            vehicle
                                                                .specifications
                                                                .crew
                                                        }
                                                    </span>
                                                </div>

                                                {/* Additional Specs */}
                                                {(vehicle.specifications
                                                    .maxSpeed ||
                                                    vehicle.specifications
                                                        .range) && (
                                                    <div className="mt-4 pt-4 border-t border-white/10">
                                                        <div className="flex justify-between text-xs">
                                                            {vehicle
                                                                .specifications
                                                                .maxSpeed && (
                                                                <div className="text-center">
                                                                    <div className="text-blue-300">
                                                                        Tezlik
                                                                    </div>
                                                                    <div className="text-white font-semibold">
                                                                        {
                                                                            vehicle
                                                                                .specifications
                                                                                .maxSpeed
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {vehicle
                                                                .specifications
                                                                .range && (
                                                                <div className="text-center">
                                                                    <div className="text-blue-300">
                                                                        Masofa
                                                                    </div>
                                                                    <div className="text-white font-semibold">
                                                                        {
                                                                            vehicle
                                                                                .specifications
                                                                                .range
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* View Details Button - har doim pastda */}
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold group-hover:shadow-lg group-hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                                                    Batafsil
                                                    <svg
                                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {searchTerm || filterType !== "all"
                                        ? "Texnika topilmadi"
                                        : "Hech qanday texnika mavjud emas"}
                                </h3>
                                <p className="text-blue-200 max-w-md mx-auto mb-6">
                                    {searchTerm
                                        ? `"${searchTerm}" bo'yicha hech qanday natija topilmadi. Boshqa kalit so'zlar bilan qayta urinib ko'ring.`
                                        : filterType !== "all"
                                        ? `${filterType} turidagi texnikalar hozircha mavjud emas.`
                                        : "Hozircha hech qanday texnika mavjud emas."}
                                </p>
                                {(searchTerm || filterType !== "all") && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setFilterType("all");
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                    >
                                        Barcha filtrlarni tozalash
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-8 mt-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-blue-300 mb-4">
                            &copy; 2025 O'zbekiston Havo Kuchlari.
                        </p>
                        <div className="flex justify-center gap-6 text-blue-200 text-sm">
                            <span>Jami modellar: {vehicles.length}</span>
                            <span>•</span>
                            <span>
                                Faol modellar:{" "}
                                {
                                    vehicles.filter(
                                        (v) =>
                                            v.specifications.status === "Faol"
                                    ).length
                                }
                            </span>
                            <span>•</span>
                            <span>Yangilangan: {new Date().getFullYear()}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Ttxlar;
