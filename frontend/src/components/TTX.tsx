import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Types
interface TtxaData {
    id: number;
    model_name: string;
    model_image: string;
    manufacturer_country: string;
    country_flag: string;
    short_description: string;
    ttxa_data: Record<string, unknown>;
    template_fields?: Array<{
        id: number;
        name: string;
        label: string;
        field_type: string;
        unit?: string;
        description?: string;
        is_required: boolean;
        order: number;
        icon?: string;
    }>;
}

const TtxaPage: React.FC = () => {
    const { modelId } = useParams<{ modelId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [ttxaData, setTtxaData] = useState<TtxaData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [columns, setColumns] = useState<unknown[][]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (modelId) {
            fetchTtxaData(parseInt(modelId));
        }
    }, [modelId]);

    const fetchTtxaData = async (id: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${BASE_URL}/api/characteristic_entries/model/${id}/ttxa`
            );
            setTtxaData(response.data);
        } catch (error) {
            console.error("TTXA ma'lumotlarini olishda xatolik:", error);
            setError("TTXA ma'lumotlarini yuklashda xatolik yuz berdi");
        } finally {
            setIsLoading(false);
        }
    };

    // Balandlik asosida ustunlarni hisoblash
    const calculateColumns = () => {
        const allSpecs = getAllSpecifications();
        if (!containerRef.current || allSpecs.length === 0) return;

        const maxItemsPerColumn = 8;
        const newColumns: any[][] = [];
        let currentColumn: any[] = [];

        allSpecs.forEach((spec, index) => {
            currentColumn.push(spec);

            if (
                currentColumn.length >= maxItemsPerColumn ||
                index === allSpecs.length - 1
            ) {
                newColumns.push([...currentColumn]);
                currentColumn = [];
            }
        });

        setColumns(newColumns);
    };

    useEffect(() => {
        calculateColumns();

        const handleResize = () => {
            calculateColumns();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [ttxaData]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            calculateColumns();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const handleBackClick = () => {
        const returnUrl = (location.state as any)?.returnUrl;

        if (returnUrl) {
            navigate(returnUrl, { replace: true });
        } else if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/user", { replace: true });
        }
    };

    const handleDownloadPDF = async () => {
        if (!ttxaData) return;

        try {
            setIsGeneratingPDF(true);
            const html2canvas = (await import("html2canvas")).default;
            const jsPDF = (await import("jspdf")).default;

            const pdfContainer = document.createElement("div");
            pdfContainer.style.position = "fixed";
            pdfContainer.style.left = "-9999px";
            pdfContainer.style.top = "0";
            pdfContainer.style.width = "794px";
            pdfContainer.style.backgroundColor = "white";
            pdfContainer.style.padding = "20px";
            pdfContainer.style.zIndex = "9999";

            const loadImageAsBase64 = (url: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "Anonymous";
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");
                        ctx?.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL("image/jpeg"));
                    };
                    img.onerror = reject;
                    img.src = url;
                });
            };

            let vehicleImageBase64 = "";
            try {
                vehicleImageBase64 = await loadImageAsBase64(
                    getImageUrl(ttxaData.model_image)
                );
            } catch (error) {
                console.error(
                    "Rasm yuklanmadi, placeholder ishlatiladi:",
                    error
                );
                const canvas = document.createElement("canvas");
                canvas.width = 400;
                canvas.height = 300;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.fillStyle = "#1e3a8a";
                    ctx.fillRect(0, 0, 400, 300);
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "20px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(ttxaData.model_name, 200, 150);
                }
                vehicleImageBase64 = canvas.toDataURL("image/jpeg");
            }

            // PDF uchun TTT larni 3 ustunga bo'lish
            const allSpecs = getAllSpecifications();
            const specsPerColumn = Math.ceil(allSpecs.length / 3);
            const column1Specs = allSpecs.slice(0, specsPerColumn);
            const column2Specs = allSpecs.slice(
                specsPerColumn,
                specsPerColumn * 2
            );
            const column3Specs = allSpecs.slice(specsPerColumn * 2);

            // PDF kontentini yaratish
            pdfContainer.innerHTML = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <!-- Sarlavha va rasm -->
                    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; margin-bottom: 30px; align-items: start;">
                        <!-- Rasm -->
                        <div style="text-align: center;">
                            <img 
                                src="${vehicleImageBase64}" 
                                alt="${ttxaData.model_name}" 
                                style="width: 180px; height: 135px; object-fit: contain; border: 2px solid #e5e7eb; border-radius: 8px; background: #f8fafc;"
                            />
                            <div style="margin-top: 8px; font-size: 12px; color: #6b7280;">
                                ${ttxaData.manufacturer_country}
                            </div>
                        </div>
                        
                        <!-- Texnika ma'lumotlari -->
                        <div style="padding: 15px; background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; border-radius: 10px;">
                            <h1 style="font-size: 28px; margin: 0 0 10px 0; font-weight: bold;">${
                                ttxaData.model_name
                            }</h1>
                            <div style="display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
                                <span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 15px; font-size: 12px;">
                                    ${ttxaData.manufacturer_country}
                                </span>
                                <span style="background: #10b981; padding: 6px 12px; border-radius: 15px; font-size: 12px;">
                                    Faol
                                </span>
                            </div>
                            <p style="font-size: 16px; margin: 0; opacity: 0.9; line-height: 1.4;">${
                                ttxaData.short_description
                            }</p>
                        </div>
                    </div>

                    <!-- Taktik-Texnik Tavsif -->
                    <div style="margin-bottom: 30px;">
                        <h2 style="font-size: 22px; color: #1e40af; text-align: center; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                            📋 Taktik-Texnik Tavsif (TTT)
                        </h2>
                        
                        <!-- 3 ustunli grid -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
                            <!-- 1-ustun -->
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${column1Specs
                                    .map(
                                        (spec) => `
                                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; min-height: 60px; display: flex; flex-direction: column; justify-content: center;">
                                        <div style="font-size: 10px; color: #1e40af; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; line-height: 1.2;">
                                            ${spec.label}
                                        </div>
                                        <div style="font-size: 13px; color: #1f2937; font-weight: bold; line-height: 1.2;">
                                            ${spec.value} ${
                                            spec.unit
                                                ? `<span style="color: #6b7280; font-size: 11px;">${spec.unit}</span>`
                                                : ""
                                        }
                                        </div>
                                    </div>
                                `
                                    )
                                    .join("")}
                            </div>
                            
                            <!-- 2-ustun -->
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${column2Specs
                                    .map(
                                        (spec) => `
                                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; min-height: 60px; display: flex; flex-direction: column; justify-content: center;">
                                        <div style="font-size: 10px; color: #1e40af; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; line-height: 1.2;">
                                            ${spec.label}
                                        </div>
                                        <div style="font-size: 13px; color: #1f2937; font-weight: bold; line-height: 1.2;">
                                            ${spec.value} ${
                                            spec.unit
                                                ? `<span style="color: #6b7280; font-size: 11px;">${spec.unit}</span>`
                                                : ""
                                        }
                                        </div>
                                    </div>
                                `
                                    )
                                    .join("")}
                            </div>

                            <!-- 3-ustun -->
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${column3Specs
                                    .map(
                                        (spec) => `
                                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; min-height: 60px; display: flex; flex-direction: column; justify-content: center;">
                                        <div style="font-size: 10px; color: #1e40af; font-weight: bold; margin-bottom: 4px; text-transform: uppercase; line-height: 1.2;">
                                            ${spec.label}
                                        </div>
                                        <div style="font-size: 13px; color: #1f2937; font-weight: bold; line-height: 1.2;">
                                            ${spec.value} ${
                                            spec.unit
                                                ? `<span style="color: #6b7280; font-size: 11px;">${spec.unit}</span>`
                                                : ""
                                        }
                                        </div>
                                    </div>
                                `
                                    )
                                    .join("")}
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="border-top: 2px solid #e5e7eb; padding-top: 15px; text-align: center; color: #6b7280; font-size: 11px;">
                        <p>Ma'lumotlar yangilangan: ${new Date().toLocaleDateString(
                            "uz-UZ"
                        )}</p>
                        <p>Hujjat ID: ${
                            ttxaData.id
                        } | © ${new Date().getFullYear()} O'zbekiston Havo Kuchlari</p>
                    </div>
                </div>
            `;

            document.body.appendChild(pdfContainer);
            const canvas = await html2canvas(pdfContainer, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                width: pdfContainer.scrollWidth,
                height: pdfContainer.scrollHeight,
            });

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

            pdf.addImage(
                imgData,
                "JPEG",
                imgX,
                0,
                imgWidth * ratio,
                imgHeight * ratio
            );
            pdf.save(`${ttxaData.model_name}_taktik_texnik_tavsif.pdf`);
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

    const getAllSpecifications = () => {
        if (!ttxaData || !ttxaData.ttxa_data) return [];

        const specs = [];
        for (const [key, value] of Object.entries(ttxaData.ttxa_data)) {
            if (
                value &&
                value !== "" &&
                value !== "Noma'lum" &&
                ![
                    "model_image",
                    "country_flag",
                    "manufacturer_country",
                    "short_description",
                ].includes(key)
            ) {
                const fieldInfo = ttxaData.template_fields?.find(
                    (field) => field.name === key
                );

                specs.push({
                    key,
                    value,
                    label: fieldInfo?.label || formatSpecKey(key),
                    icon: fieldInfo?.icon,
                    unit: fieldInfo?.unit,
                });
            }
        }

        // Order bo'yicha saralash
        return specs.sort((a, b) => {
            const fieldA = ttxaData.template_fields?.find(
                (f) => f.name === a.key
            );
            const fieldB = ttxaData.template_fields?.find(
                (f) => f.name === b.key
            );
            return (fieldA?.order || 0) - (fieldB?.order || 0);
        });
    };

    const getIconUrl = (iconPath?: string) => {
        if (!iconPath) return null;

        if (iconPath.startsWith("http")) {
            return iconPath;
        } else if (iconPath.startsWith("/")) {
            return `${BASE_URL}${iconPath}`;
        } else {
            return `${BASE_URL}/${iconPath}`;
        }
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath)
            return `https://via.placeholder.com/400x300/1e3a8a/ffffff?text=${
                ttxaData?.model_name || "Model"
            }`;

        if (imagePath.startsWith("http")) {
            return imagePath;
        } else if (imagePath.startsWith("/")) {
            return `${BASE_URL}${imagePath}`;
        } else {
            return `${BASE_URL}/${imagePath}`;
        }
    };

    // Modalni yopish uchun ESC tugmasi va background bosilganda
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsImageModalOpen(false);
            }
        };

        if (isImageModalOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Scroll ni block qilish
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isImageModalOpen]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <div className="text-white text-lg">
                        TTXA ma'lumotlari yuklanmoqda...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !ttxaData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Xatolik
                    </h3>
                    <p className="text-blue-200 mb-6">
                        {error || "Ma'lumotlar topilmadi"}
                    </p>
                    <button
                        onClick={handleBackClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                    >
                        Orqaga qaytish
                    </button>
                </div>
            </div>
        );
    }

    const allSpecs = getAllSpecifications();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Rasm Modal - Yangilangan versiya */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        background:
                            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
                    }}
                >
                    {/* Orqa fon bosilganda modalni yopish */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsImageModalOpen(false)}
                    />

                    {/* Modal kontenti */}
                    <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                        {/* X tugmasi */}
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 shadow-lg border-2 border-white/20"
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
                                    strokeWidth={3}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Rasm */}
                        <div className="relative w-full h-full flex items-center justify-center p-8">
                            <img
                                src={getImageUrl(ttxaData.model_image)}
                                alt={ttxaData.model_name}
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/20"
                                onError={(e) => {
                                    e.currentTarget.src = `https://via.placeholder.com/1200x800/1e3a8a/ffffff?text=${ttxaData.model_name}`;
                                }}
                            />

                            {/* Rasm tagidagi matn */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                                <h3 className="text-lg font-bold text-center">
                                    {ttxaData.model_name}
                                </h3>
                                <p className="text-sm text-blue-300 text-center">
                                    {ttxaData.manufacturer_country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handleBackClick}
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
                        Orqaga qaytish
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
                    <div className="flex gap-6">
                        {/* CHAP TOMON: Rasm va asosiy ma'lumotlar */}
                        <div className="w-80 flex-shrink-0">
                            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden sticky top-4">
                                <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-800/20">
                                    <img
                                        src={getImageUrl(ttxaData.model_image)}
                                        alt={ttxaData.model_name}
                                        className="w-full h-64 object-contain cursor-pointer p-4 hover:scale-105 transition-transform duration-300"
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        onError={(e) => {
                                            e.currentTarget.src = `https://via.placeholder.com/400x300/1e3a8a/ffffff?text=${ttxaData.model_name}`;
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            setIsImageModalOpen(true)
                                        }
                                        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors backdrop-blur-sm border border-white/20 hover:scale-110"
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
                                    </button>
                                </div>

                                <div className="p-5">
                                    <h1 className="text-2xl font-bold text-white mb-3">
                                        {ttxaData.model_name}
                                    </h1>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {ttxaData.manufacturer_country}
                                        </span>
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Faol
                                        </span>
                                    </div>
                                    <p className="text-blue-200 text-base leading-relaxed">
                                        {ttxaData.short_description}
                                    </p>

                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-6 h-4 rounded overflow-hidden border border-white/20 flex-shrink-0">
                                            <img
                                                src={getImageUrl(
                                                    ttxaData.country_flag
                                                )}
                                                alt={
                                                    ttxaData.manufacturer_country
                                                }
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://via.placeholder.com/24x16/1e3a8a/ffffff?text=Flag`;
                                                }}
                                            />
                                        </div>
                                        <span className="text-blue-200 text-sm">
                                            {ttxaData.manufacturer_country}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* O'NG TOMON: TTT lar (iconlar bilan) */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-4 h-[85vh] flex flex-col">
                                <h2 className="text-xl font-bold text-white mb-6 text-center flex-shrink-0">
                                    📋 Taktik-Texnik Tavsif (TTT)
                                </h2>

                                {/* Gorizontal scroll qiladigan TTT lar */}
                                <div
                                    ref={containerRef}
                                    className="overflow-x-auto flex-1"
                                >
                                    <div className="flex gap-3 min-w-max h-full">
                                        {columns.map((column, columnIndex) => (
                                            <div
                                                key={columnIndex}
                                                className="w-90 flex-shrink-0"
                                            >
                                                <div className="space-y-2">
                                                    {column.map(
                                                        (spec, index) => (
                                                            <div
                                                                key={index}
                                                                className="bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:bg-white/10 p-3 min-h-[65px] flex items-center gap-3 group"
                                                            >
                                                                {/* Icon qismi */}
                                                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center overflow-hidden backdrop-blur-sm border border-white/10">
                                                                    {spec.icon ? (
                                                                        <img
                                                                            src={
                                                                                getIconUrl(
                                                                                    spec.icon
                                                                                ) ??
                                                                                undefined
                                                                            }
                                                                            alt={
                                                                                spec.label
                                                                            }
                                                                            className="w-6 h-6 object-contain"
                                                                            onError={(
                                                                                e
                                                                            ) => {
                                                                                e.currentTarget.style.display =
                                                                                    "none";
                                                                                const fallback =
                                                                                    document.createElement(
                                                                                        "div"
                                                                                    );
                                                                                fallback.className =
                                                                                    "text-lg";
                                                                                fallback.textContent =
                                                                                    "📋";
                                                                                e.currentTarget.parentNode?.appendChild(
                                                                                    fallback
                                                                                );
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div className="text-lg">
                                                                            📋
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Matn qismi */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="grid grid-cols-2 gap-4 items-center">
                                                                        <div className="text-blue-300 font-semibold text-xs uppercase tracking-wider leading-tight">
                                                                            {
                                                                                spec.label
                                                                            }
                                                                        </div>
                                                                        <div className="text-white font-bold text-sm leading-tight text-right whitespace-normal">
                                                                            {
                                                                                spec.value
                                                                            }
                                                                            {spec.unit && (
                                                                                <span className="text-blue-300 text-xs ml-1">
                                                                                    {
                                                                                        spec.unit
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {allSpecs.length === 0 && (
                                    <div className="text-center py-8 flex-1 flex items-center justify-center">
                                        <div className="text-blue-300 text-lg">
                                            Hozircha texnik xususiyatlar
                                            kiritilmagan
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 pt-4 border-t border-white/10 flex-shrink-0">
                                    <div className="flex justify-between items-center text-sm text-blue-300">
                                        <div>
                                            Ma'lumotlar yangilangan:{" "}
                                            {new Date().toLocaleDateString(
                                                "uz-UZ"
                                            )}
                                        </div>
                                        <div>Hujjat ID: {ttxaData.id}</div>
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

export default TtxaPage;
