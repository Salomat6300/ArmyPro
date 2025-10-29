import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
    CountryA,
    Category,
} from "C:/Users/fuugo/Desktop/ArmyPro/frontend/src/types/index.ts";
import { countries } from "C:/Users/fuugo/Desktop/ArmyPro/frontend/data/Countries";
import { categories } from "C:/Users/fuugo/Desktop/ArmyPro/frontend/data/Categories";

// Bayroq rasmlarini import qilamiz
import uzFlag from "C:/Users/fuugo/Desktop/ArmyPro/frontend/src/assets/flag/uz.png";
import ruFlag from "C:/Users/fuugo/Desktop/ArmyPro/frontend/src/assets/flag/kg.png";
import uaFlag from "C:/Users/fuugo/Desktop/ArmyPro/frontend/src/assets/flag/kz.png";
import czFlag from "C:/Users/fuugo/Desktop/ArmyPro/frontend/src/assets/flag/af.png";
import usFlag from "C:/Users/fuugo/Desktop/ArmyPro/frontend/src/assets/flag/af.png";

// Bayroq rasmlarini mapping qilamiz
const flagImages: { [key: string]: string } = {
    "1": uzFlag, // O'zbekiston
    "2": ruFlag, // Rossiya
    "3": usFlag, // AQSH
    "4": uaFlag, // Xitoy (kz.png dan foydalanyapmiz)
    "5": czFlag, // Turkiya (af.png dan foydalanyapmiz)
    "6": uzFlag, // Hindiston (uz.png dan foydalanyapmiz)
};

const Home1: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState<CountryA | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [countryCategories, setCountryCategories] = useState<Category[]>([]);

    // Dastlabki yuklash - O'zbekiston tanlangan bo'lsin
    useEffect(() => {
        const uzbekistan = countries.find(
            (country) => country.name === "O'zbekiston"
        );
        if (uzbekistan) {
            handleCountrySelect(uzbekistan);
        }
    }, []);

    const handleCountrySelect = (country: CountryA) => {
        setIsLoading(true);
        setSelectedCountry(country);

        // Tanlangan davlatning bo'limlarini filtrlash
        const countryCats = categories.filter((cat) =>
            country.categories.includes(cat.id)
        );
        setCountryCategories(countryCats);

        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    const handleCategorySelect = (category: Category) => {
        if (selectedCountry) {
            navigate(`/category/${selectedCountry.id}/${category.id}`);
        }
    };

    const filteredCategories = countryCategories.filter(
        (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    // Har bir davlatning umumiy texnika soni
    const getTotalVehiclesCount = (country: CountryA) => {
        return categories
            .filter((cat) => country.categories.includes(cat.id))
            .reduce((total, cat) => total + cat.count, 0);
    };

    // Bayroq rasmini olish
    const getFlagImage = (countryId: string) => {
        return flagImages[countryId] || uzFlag; // Agar rasm topilmasa, default O'zbekiston bayrog'i
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-b border-white/20 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-xl">✈️</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    Havo Mudofaasi Tizimlari
                                </h1>
                                <p className="text-blue-200 text-sm">
                                    Davlatlar va ularning harbiy texnikalari
                                </p>
                            </div>
                        </div>

                        {/* Search Box */}
                        <div className="w-96">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Bo'limlar bo'yicha qidirish..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        className="w-4 h-4 text-blue-300"
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
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Fixed Sidebar - Davlatlar */}
                <div className="w-80 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16">
                    <div className="bg-white/5 backdrop-blur-lg border-r border-white/10 h-full overflow-y-auto">
                        <div className="p-5">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-3xl">🌍</span>
                                Davlatlar
                            </h2>

                            <div className="space-y-3">
                                {countries.map((country) => (
                                    <button
                                        key={country.id}
                                        onClick={() =>
                                            handleCountrySelect(country)
                                        }
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                                            selectedCountry?.id === country.id
                                                ? "bg-blue-600 text-white shadow-lg transform scale-[1.02]"
                                                : "bg-white/5 text-blue-100 hover:bg-white/10 hover:transform hover:scale-[1.02]"
                                        }`}
                                    >
                                        {/* Bayroq rasmi - o'rtacha o'lcham */}
                                        <div className="flex-shrink-0 w-15 h-10 bg-white/10  overflow-hidden border border-white/20">
                                            <img
                                                src={getFlagImage(country.id)}
                                                alt={`${country.name} bayrog'i`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        "none";
                                                    const parent =
                                                        e.currentTarget
                                                            .parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `<span class="text-base flex items-center justify-center h-full">${country.flag}</span>`;
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Davlat ma'lumotlari - o'rtacha kattalikda */}
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="font-semibold text-white text-base mb-1">
                                                {country.name}
                                            </div>
                                            <div className="text-sm text-blue-200">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span>
                                                        {country.englishName}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {
                                                            country.categories
                                                                .length
                                                        }{" "}
                                                        bo'lim
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {getTotalVehiclesCount(
                                                            country
                                                        )}{" "}
                                                        texnika
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Faol davlat ko'rsatkichi */}
                                        {selectedCountry?.id === country.id && (
                                            <div className="flex-shrink-0 w-3 h-3 bg-green-400 rounded-full ml-2"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Statistics - o'rtacha kattalikda */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="space-y-4">
                                    <div className="text-center bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="text-2xl font-bold text-white">
                                            {countries.reduce(
                                                (total, country) =>
                                                    total +
                                                    getTotalVehiclesCount(
                                                        country
                                                    ),
                                                0
                                            )}
                                        </div>
                                        <div className="text-sm text-blue-200 font-medium">
                                            Jami Texnika
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                            <div className="text-lg font-bold text-white">
                                                {countries.length}
                                            </div>
                                            <div className="text-sm text-blue-200">
                                                Davlatlar
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                            <div className="text-lg font-bold text-white">
                                                {categories.length}
                                            </div>
                                            <div className="text-sm text-blue-200">
                                                Bo'limlar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Bo'limlar */}
                <div className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-8">
                        {!selectedCountry ? (
                            // Davlat tanlanmagan holat
                            <div className="text-center py-20">
                                <div className="text-8xl mb-6">🌍</div>
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    Davlatni tanlang
                                </h2>
                                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                                    Havo mudofaasi tizimlarini ko'rish uchun
                                    chap tomondan davlatni tanlang
                                </p>
                            </div>
                        ) : isLoading ? (
                            // Yuklanayotgan holat
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                                <div className="text-white text-lg">
                                    {selectedCountry.name} ma'lumotlari
                                    yuklanmoqda...
                                </div>
                            </div>
                        ) : (
                            // Bo'limlar ko'rsatiladi
                            <div>
                                {/* Country Header */}
                                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 mb-8">
                                    <div className="flex items-center gap-6">
                                        {/* Katta bayroq rasmi */}
                                        <div className="w-20 h-14 bg-white/10  overflow-hidden">
                                            <img
                                                src={getFlagImage(
                                                    selectedCountry.id
                                                )}
                                                alt={`${selectedCountry.name} bayrog'i`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        "none";
                                                    const parent =
                                                        e.currentTarget
                                                            .parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `<span class="text-4xl flex items-center justify-center h-full">${selectedCountry.flag}</span>`;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <h1 className="text-4xl font-bold text-white">
                                                    {selectedCountry.name}
                                                </h1>
                                                <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {
                                                        selectedCountry.englishName
                                                    }
                                                </span>
                                            </div>
                                            <p className="text-blue-200 text-lg mb-4">
                                                {selectedCountry.name} harbiy
                                                havo kuchlari va mudofaa
                                                tizimlari
                                            </p>
                                            <div className="flex gap-6">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">
                                                        {
                                                            countryCategories.length
                                                        }
                                                    </div>
                                                    <div className="text-sm text-blue-200">
                                                        Harbiy Bo'limlar
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">
                                                        {getTotalVehiclesCount(
                                                            selectedCountry
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-blue-200">
                                                        Jami Texnika
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white">
                                                        {
                                                            selectedCountry
                                                                .categories
                                                                .length
                                                        }
                                                    </div>
                                                    <div className="text-sm text-blue-200">
                                                        Faol Bo'limlar
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Categories Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCategories.map((category) => (
                                        <div
                                            key={category.id}
                                            onClick={() =>
                                                handleCategorySelect(category)
                                            }
                                            className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-white/10 hover:border-blue-400/30"
                                        >
                                            {/* Category Image/Icon */}
                                            <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                                                        {category.icon}
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-3xl">
                                                            {category.icon}
                                                        </span>
                                                        <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                            {category.count} ta
                                                            texnika
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                                        {category.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <p className="text-blue-200 mb-6 leading-relaxed">
                                                    {category.description}
                                                </p>

                                                {/* Quick Stats */}
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-blue-300">
                                                        Texnika turlari:
                                                    </span>
                                                    <span className="text-white font-semibold">
                                                        {category.count}
                                                    </span>
                                                </div>

                                                {/* Action Button */}
                                                <div className="mt-6 pt-4 border-t border-white/10">
                                                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold group-hover:shadow-lg group-hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                                                        Ko'rish
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

                                {/* Empty Search State */}
                                {filteredCategories.length === 0 && (
                                    <div className="text-center py-20">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Bo'lim topilmadi
                                        </h3>
                                        <p className="text-blue-200 max-w-md mx-auto">
                                            "{searchTerm}" bo'yicha hech qanday
                                            natija topilmadi. Boshqa kalit
                                            so'zlar bilan qayta urinib ko'ring.
                                        </p>
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                                        >
                                            Barcha bo'limlarni ko'rsatish
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-8 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="text-center">
                                <p className="text-blue-300 mb-4">
                                    &copy; 2024 Harbiy Havo Texnikalari
                                    Katalogi. Barcha huquqlar himoyalangan.
                                </p>
                                <div className="flex justify-center gap-6 text-blue-200 text-sm">
                                    <span>
                                        Jami davlatlar: {countries.length}
                                    </span>
                                    <span>•</span>
                                    <span>
                                        Harbiy bo'limlar: {categories.length}
                                    </span>
                                    <span>•</span>
                                    <span>
                                        Yangilangan: {new Date().getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Home1;
