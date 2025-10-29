import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vehicles } from "C:/Users/fuugo/Desktop/ArmyPro/frontend/data/BazaTTX";
import type { Vehicle } from "../types";

const VehicleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

    const handleDownloadPDF = async () => {
        try {
            setIsGeneratingPDF(true);

            // Dinamik import
            const html2canvas = (await import("html2canvas")).default;
            const jsPDF = (await import("jspdf")).default;

            // PDF uchun maxsus element yaratish
            const pdfContainer = document.createElement("div");
            pdfContainer.style.position = "fixed";
            pdfContainer.style.left = "-9999px";
            pdfContainer.style.top = "0";
            pdfContainer.style.width = "794px"; // A4 width in pixels
            pdfContainer.style.backgroundColor = "white";
            pdfContainer.style.padding = "20px";
            pdfContainer.style.zIndex = "9999";

            // TTT larni 2 ustunga bo'lish
            const allSpecs = getAllSpecifications();
            const midIndex = Math.ceil(allSpecs.length / 2);
            const leftColumnSpecs = allSpecs.slice(0, midIndex);
            const rightColumnSpecs = allSpecs.slice(midIndex);

            // PDF kontentini yaratish
            pdfContainer.innerHTML = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <!-- Sarlavha -->
                    <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; border-radius: 10px;">
                        <h1 style="font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">${
                            vehicle.name
                        }</h1>
                        <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 10px;">
                            <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px;">
                                ${vehicle.type}
                            </span>
                            <span style="background: ${
                                vehicle.specifications.status === "Faol"
                                    ? "#10b981"
                                    : "#f59e0b"
                            }; padding: 8px 16px; border-radius: 20px; font-size: 14px;">
                                ${vehicle.specifications.status}
                            </span>
                        </div>
                        <p style="font-size: 18px; margin: 0; opacity: 0.9;">${
                            vehicle.shortDescription
                        }</p>
                    </div>

                    <!-- Taktik-Texnik Tavsif -->
                    <div style="margin-bottom: 30px;">
                        <h2 style="font-size: 24px; color: #1e40af; text-align: center; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                            📋 Taktik-Texnik Tavsif (TTT)
                        </h2>
                        
                        <!-- 2 ustunli grid -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <!-- Chap ustun -->
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${leftColumnSpecs
                                    .map(
                                        (spec, index) => `
                                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                        <div style="font-size: 12px; color: #1e40af; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">
                                            ${formatSpecKey(spec.key)}
                                        </div>
                                        <div style="font-size: 16px; color: #1f2937; font-weight: bold;">
                                            ${spec.value}
                                        </div>
                                    </div>
                                `
                                    )
                                    .join("")}
                            </div>
                            
                            <!-- O'ng ustun -->
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${rightColumnSpecs
                                    .map(
                                        (spec, index) => `
                                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                                        <div style="font-size: 12px; color: #1e40af; font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">
                                            ${formatSpecKey(spec.key)}
                                        </div>
                                        <div style="font-size: 16px; color: #1f2937; font-weight: bold;">
                                            ${spec.value}
                                        </div>
                                    </div>
                                `
                                    )
                                    .join("")}
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
                        <p>Ma'lumotlar yangilangan: ${new Date().toLocaleDateString(
                            "uz-UZ"
                        )}</p>
                        <p>Hujjat ID: ${
                            vehicle.id
                        } | © ${new Date().getFullYear()} O'zbekiston Havo Kuchlari</p>
                    </div>
                </div>
            `;

            // DOM ga qo'shish
            document.body.appendChild(pdfContainer);

            // Canvas yaratish
            const canvas = await html2canvas(pdfContainer, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                width: pdfContainer.scrollWidth,
                height: pdfContainer.scrollHeight,
            });

            // PDF yaratish
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            // Rasmni PDF ga qo'shish
            pdf.addImage(
                imgData,
                "JPEG",
                imgX,
                imgY,
                imgWidth * ratio,
                imgHeight * ratio
            );

            // PDF ni yuklab olish
            pdf.save(`${vehicle.name}_taktik_texnik_tavsif.pdf`);

            // Tozalash
            document.body.removeChild(pdfContainer);
        } catch (error) {
            console.error("PDF yaratishda xatolik:", error);
            alert(
                "PDF yaratishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
            );
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    // Bazadagi barcha xususiyatlarni olish
    const getAllSpecifications = () => {
        const specs = [];
        for (const [key, value] of Object.entries(vehicle.specifications)) {
            if (value && value !== "" && value !== "Noma'lum") {
                specs.push({ key, value });
            }
        }
        return specs;
    };

    const allSpecs = getAllSpecifications();

    // Ekranda ham 2 ustunli ko'rinish uchun
    const midIndex = Math.ceil(allSpecs.length / 2);
    const leftColumnSpecs = allSpecs.slice(0, midIndex);
    const rightColumnSpecs = allSpecs.slice(midIndex);

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

            {/* Soddalashtirilgan Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
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

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl transition-colors font-semibold flex items-center gap-2"
                    >
                        {isGeneratingPDF ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                PDF yaratilmoqda...
                            </>
                        ) : (
                            <>
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
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                PDF yuklab olish
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-8">
                <div className="max-w-[95vw] mx-auto">
                    {" "}
                    {/* Kengaytirilgan maksimal kenglik */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {" "}
                        {/* 12 ustunli grid */}
                        {/* Chap tomonda - Rasm va funksiyalar */}
                        <div className="lg:col-span-3">
                            {" "}
                            {/* 3/12 qismi */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden sticky top-4">
                                {/* Kichik rasm */}
                                <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-800/20">
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className="w-full h-48 object-contain cursor-pointer p-4"
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        onError={(e) => {
                                            e.currentTarget.src = `https://via.placeholder.com/400x300/1e3a8a/ffffff?text=${vehicle.name}`;
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded transition-colors backdrop-blur-sm border border-white/20"
                                    >
                                        <svg
                                            className="w-4 h-4"
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
                                    </button>
                                </div>

                                {/* Asosiy ma'lumotlar */}
                                <div className="p-4">
                                    <h1 className="text-xl font-bold text-white mb-2">
                                        {vehicle.name}
                                    </h1>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            {vehicle.type}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                vehicle.specifications
                                                    .status === "Faol"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-yellow-500 text-white"
                                            }`}
                                        >
                                            {vehicle.specifications.status}
                                        </span>
                                    </div>
                                    <p className="text-blue-200 text-sm mb-4">
                                        {vehicle.shortDescription}
                                    </p>
                                </div>

                                {/* Rasm tagidagi funksiyalar */}
                                <div className="p-4 border-t border-white/10 space-y-3">
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPDF}
                                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
                                    >
                                        {isGeneratingPDF ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Yaratilmoqda...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                PDF yuklab olish
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
                                    >
                                        <svg
                                            className="w-4 h-4"
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
                            </div>
                        </div>
                        {/* O'ng tomonda - Barcha TTT lar (KENGAYTIRILGAN) */}
                        <div className="lg:col-span-9">
                            {" "}
                            {/* 9/12 qismi - kengaytirilgan */}
                            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden w-full">
                                <div className="p-6 border-b border-white/10">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        📋 Taktik-Texnik Tavsif (TTT)
                                    </h2>
                                    <p className="text-blue-200 text-lg">
                                        {vehicle.name} - Barcha texnik
                                        xususiyatlar
                                    </p>
                                </div>

                                <div className="p-6">
                                    {/* 2 ustunli grid - Barcha texnik xususiyatlar (KENG) */}
                                    <div className="grid grid-cols-1 xl:grid-cols-1 gap-2 w-full">
                                        {/* Chap ustun */}
                                        <div className="space-y-2">
                                            {leftColumnSpecs.map(
                                                (spec, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:bg-white/10 w-full"
                                                    >
                                                        <div className="text-blue-300 font-medium text-lg flex-1">
                                                            {formatSpecKey(
                                                                spec.key
                                                            )}
                                                        </div>
                                                        <div className="text-white font-semibold text-lg text-right flex-1">
                                                            {spec.value}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* O'ng ustun */}
                                        <div className="space-y-2">
                                            {rightColumnSpecs.map(
                                                (spec, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:bg-white/10 w-full"
                                                    >
                                                        <div className="text-blue-300 font-medium text-lg flex-1">
                                                            {formatSpecKey(
                                                                spec.key
                                                            )}
                                                        </div>
                                                        <div className="text-white font-semibold text-lg text-right flex-1">
                                                            {spec.value}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Izohlar */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center text-sm text-blue-300">
                                            <div>
                                                Ma'lumotlar yangilangan:{" "}
                                                {new Date().toLocaleDateString(
                                                    "uz-UZ"
                                                )}
                                            </div>
                                            <div>Hujjat ID: {vehicle.id}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Texnik xususiyat kalitlarini formatlash funksiyasi
const formatSpecKey = (key: string): string => {
    const translations: { [key: string]: string } = {
        manufacturer: "Ishlab chiqaruvchi",
        firstFlight: "Birinchi parvoz",
        primaryUser: "Asosiy foydalanuvchi",
        crew: "Ekipaj",
        length: "Uzunlik",
        wingspan: "Qanotlar kengligi",
        height: "Balandlik",
        maxSpeed: "Maksimal tezlik",
        range: "Maksimal masofa",
        engine: "Dvigatel",
        status: "Holati",
        emptyWeight: "Bo'sh og'irlik",
        maxTakeoffWeight: "Maksimal uchish og'irligi",
        fuelCapacity: "Yonilg'i sig'imi",
        serviceCeiling: "Xizmat balandligi",
        cruiseSpeed: "Kreyser tezlik",
        thrust: "Reaktiv kuch",
        power: "Quvvat",
        armament: "Qurol-yarog'",
        productionYears: "Ishlab chiqarish yillari",
        numberBuilt: "Ishlab chiqarilgan soni",
        wingArea: "Qanotlar maydoni",
        serviceInterval: "Xizmat muddati",
        weight: "Og'irlik",
        speed: "Tezlik",
        altitude: "Balandlik",
        capacity: "Sig'im",
        system: "Tizim",
        equipment: "Uskuna",
        features: "Xususiyatlar",
        performance: "Ishlash ko'rsatkichlari",
    };

    return (
        translations[key] ||
        key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    );
};

export default VehicleDetail;
