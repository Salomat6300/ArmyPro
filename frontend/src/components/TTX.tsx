import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vehicles } from "C:/Users/fuugo/Desktop/ArmyPro/frontend/data/BazaTTX";
import type { Vehicle } from "../types";

const VehicleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === id);

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">
                        Texnika topilmadi
                    </h1>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Ortga qaytish
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Rasm Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-6xl max-h-full">
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-contain max-h-[90vh] rounded-lg"
                            onError={(e) => {
                                e.currentTarget.src = `https://via.placeholder.com/1200x800/1e3a8a/ffffff?text=${vehicle.name}`;
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Ortga qaytish
                        </button>
                        <h1 className="text-2xl font-bold text-white">
                            Batafsil ma'lumot
                        </h1>
                        <div className="w-20"></div> {/* For balance */}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                    {/* Hero Section */}
                    <div className="relative h-80 bg-gradient-to-r from-blue-600 to-blue-800">
                        <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                            onClick={() => setIsImageModalOpen(true)}
                            onError={(e) => {
                                e.currentTarget.src = `https://via.placeholder.com/1200x400/1e3a8a/ffffff?text=${vehicle.name}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-blue-600/90 text-white px-4 py-2 rounded-full text-lg font-semibold">
                                    {vehicle.type}
                                </span>
                                {/* <span
                                    className={`px-4 py-2 rounded-full text-lg font-semibold ${
                                        vehicle.specifications.status === "Faol"
                                            ? "bg-green-500/90 text-white"
                                            : "bg-yellow-500/90 text-white"
                                    }`}
                                >
                                    {vehicle.specifications.status}
                                </span> */}
                            </div>
                            <h1 className="text-5xl font-bold text-white mb-2">
                                {vehicle.name}
                            </h1>
                            <p className="text-xl text-blue-200 max-w-2xl">
                                {vehicle.shortDescription}
                            </p>
                        </div>

                        {/* Rasmni kattalashtirish tugmasi */}
                        <button
                            onClick={() => setIsImageModalOpen(true)}
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors backdrop-blur-sm"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7"
                                />
                            </svg>
                            Rasmni kattalashtirish
                        </button>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                        {/* Asosiy ma'lumotlar */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Texnik Xususiyatlar
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Ishlab chiqaruvchi:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {
                                                    vehicle.specifications
                                                        .manufacturer
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Birinchi parvoz:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {
                                                    vehicle.specifications
                                                        .firstFlight
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Asosiy foydalanuvchi:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {
                                                    vehicle.specifications
                                                        .primaryUser
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Ekipaj:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {vehicle.specifications.crew}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Uzunlik:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {vehicle.specifications.length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Qanotlar kengligi:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {
                                                    vehicle.specifications
                                                        .wingspan
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-blue-300 font-medium">
                                                Balandlik:
                                            </span>
                                            <span className="text-white font-semibold">
                                                {vehicle.specifications.height}
                                            </span>
                                        </div>
                                        {vehicle.specifications.maxSpeed && (
                                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                                <span className="text-blue-300 font-medium">
                                                    Maksimal tezlik:
                                                </span>
                                                <span className="text-white font-semibold">
                                                    {
                                                        vehicle.specifications
                                                            .maxSpeed
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {vehicle.specifications.range && (
                                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-300 font-medium">
                                                Maksimal parvoz masofasi:
                                            </span>
                                            <span className="text-white font-bold text-lg">
                                                {vehicle.specifications.range}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Qo'shimcha ma'lumotlar */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 mt-6">
                                <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Qo'shimcha Ma'lumotlar
                                </h2>
                                <p className="text-blue-200 leading-relaxed">
                                    {vehicle.name} - {vehicle.shortDescription}{" "}
                                    Ushbu model{" "}
                                    {vehicle.specifications.manufacturer}
                                    tomonidan ishlab chiqarilgan va{" "}
                                    {vehicle.specifications.firstFlight} yildan
                                    beri xizmat ko'rsatmoqda. Hozirda{" "}
                                    {vehicle.specifications.primaryUser}{" "}
                                    tomonidan foydalanilmoqda.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar - Statistika va boshqa ma'lumotlar */}
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    Tezkor Ma'lumotlar
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-white">
                                            Holat:{" "}
                                            {vehicle.specifications.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-white">
                                            Turi: {vehicle.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <span className="text-white">
                                            Ekipaj:{" "}
                                            {vehicle.specifications.crew}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Harakatlar */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-4">
                                    Harakatlar
                                </h3>
                                <div className="space-y-3">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold">
                                        PDF formatida yuklab olish
                                    </button>
                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold">
                                        Qo'shimcha fotosuratlar
                                    </button>
                                    <button
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7"
                                            />
                                        </svg>
                                        Rasmni kattalashtirish
                                    </button>
                                    <button
                                        onClick={() => navigate("/")}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
                                    >
                                        Bosh sahifaga qaytish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;
