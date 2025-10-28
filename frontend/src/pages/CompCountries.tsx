import React, { useState, useEffect } from "react";
import {
    Search,
    Users,
    DollarSign,
    Shield,
    Zap,
    Target,
    Plane,
    Ship,
    Truck,
    Download,
    Share2,
    Star,
    Eye,
    SlidersHorizontal,
    Map,
    BarChart,
    Globe,
    TrendingUp,
    Sword,
    Award,
    Check,
    X,
    Plus,
    Trophy,
    Clock,
    Calendar,
} from "lucide-react";

interface MilitaryTech {
    id: string;
    name: string;
    type: "aircraft" | "naval" | "ground" | "missile" | "other";
    quantity: number;
    powerIndex: number;
    year: number;
    country: string;
    category: string;
}

interface Country {
    id: string;
    name: string;
    flag: string;
    population: number;
    gdp: number;
    militaryBudget: number;
    activeTroops: number;
    reserveTroops: number;
    technologies: MilitaryTech[];
    powerIndex: number;
    region: string;
    categories: string[];
    description: string;
}

interface ComparisonResult {
    winner: Country;
    reasons: string[];
    advantages: {
        category: string;
        advantage: number;
        winnerTech: MilitaryTech[];
        loserTech: MilitaryTech[];
    }[];
    score: number;
}

const CompCountries: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [showComparison, setShowComparison] = useState(false);
    const [comparisonResult, setComparisonResult] =
        useState<ComparisonResult | null>(null);
    const [activeStep, setActiveStep] = useState<"selection" | "comparison">(
        "selection"
    );

    // Namuna ma'lumotlar
    const sampleData: Country[] = [
        {
            id: "1",
            name: "AQSH",
            flag: "🇺🇸",
            population: 331000000,
            gdp: 22960000000000,
            militaryBudget: 877000000000,
            activeTroops: 1395000,
            reserveTroops: 799500,
            powerIndex: 0.0712,
            region: "Shimoliy Amerika",
            categories: [
                "Havo kuchlari",
                "Harbiy flot",
                "Raketa tizimlari",
                "Zamonaviy texnika",
            ],
            description: "Dunyoning eng kuchli harbiy davlati",
            technologies: [
                {
                    id: "t1",
                    name: "F-35 Lightning II",
                    type: "aircraft",
                    quantity: 450,
                    powerIndex: 95,
                    year: 2015,
                    country: "AQSH",
                    category: "Havo kuchlari",
                },
                {
                    id: "t2",
                    name: "Nimitz-class Aircraft Carrier",
                    type: "naval",
                    quantity: 10,
                    powerIndex: 98,
                    year: 1975,
                    country: "AQSH",
                    category: "Harbiy flot",
                },
                {
                    id: "t3",
                    name: "M1A2 Abrams",
                    type: "ground",
                    quantity: 2500,
                    powerIndex: 90,
                    year: 1992,
                    country: "AQSH",
                    category: "Zamonaviy texnika",
                },
                {
                    id: "t4",
                    name: "Trident II Missile",
                    type: "missile",
                    quantity: 240,
                    powerIndex: 96,
                    year: 1990,
                    country: "AQSH",
                    category: "Raketa tizimlari",
                },
            ],
        },
        {
            id: "2",
            name: "Rossiya",
            flag: "🇷🇺",
            population: 144000000,
            gdp: 4830000000000,
            militaryBudget: 65900000000,
            activeTroops: 1014000,
            reserveTroops: 2000000,
            powerIndex: 0.0681,
            region: "Yevropa/Osiyo",
            categories: [
                "Raketa tizimlari",
                "Tanklar",
                "Suv osti kemalari",
                "Havo mudofaasi",
            ],
            description: "Kuchli raketa tizimlari va suv osti floti",
            technologies: [
                {
                    id: "t5",
                    name: "Su-57",
                    type: "aircraft",
                    quantity: 12,
                    powerIndex: 92,
                    year: 2020,
                    country: "Rossiya",
                    category: "Havo kuchlari",
                },
                {
                    id: "t6",
                    name: "T-14 Armata",
                    type: "ground",
                    quantity: 100,
                    powerIndex: 88,
                    year: 2015,
                    country: "Rossiya",
                    category: "Tanklar",
                },
                {
                    id: "t7",
                    name: "Borei-class Submarine",
                    type: "naval",
                    quantity: 4,
                    powerIndex: 94,
                    year: 2013,
                    country: "Rossiya",
                    category: "Suv osti kemalari",
                },
                {
                    id: "t8",
                    name: "S-400 Missile System",
                    type: "missile",
                    quantity: 120,
                    powerIndex: 93,
                    year: 2007,
                    country: "Rossiya",
                    category: "Havo mudofaasi",
                },
            ],
        },
        {
            id: "3",
            name: "Xitoy",
            flag: "🇨🇳",
            population: 1402000000,
            gdp: 17700000000000,
            militaryBudget: 292000000000,
            activeTroops: 2185000,
            reserveTroops: 510000,
            powerIndex: 0.0855,
            region: "Osiyo",
            categories: [
                "Havo kuchlari",
                "Harbiy flot",
                "Quruqlik qo'shinlari",
                "Raketa tizimlari",
            ],
            description: "Tez rivojlanayotgan harbiy kuch",
            technologies: [
                {
                    id: "t9",
                    name: "J-20",
                    type: "aircraft",
                    quantity: 50,
                    powerIndex: 89,
                    year: 2017,
                    country: "Xitoy",
                    category: "Havo kuchlari",
                },
                {
                    id: "t10",
                    name: "Type 99 Tank",
                    type: "ground",
                    quantity: 1200,
                    powerIndex: 85,
                    year: 2001,
                    country: "Xitoy",
                    category: "Quruqlik qo'shinlari",
                },
                {
                    id: "t11",
                    name: "Liaoning Aircraft Carrier",
                    type: "naval",
                    quantity: 2,
                    powerIndex: 87,
                    year: 2012,
                    country: "Xitoy",
                    category: "Harbiy flot",
                },
                {
                    id: "t12",
                    name: "DF-41 Missile",
                    type: "missile",
                    quantity: 36,
                    powerIndex: 91,
                    year: 2019,
                    country: "Xitoy",
                    category: "Raketa tizimlari",
                },
            ],
        },
        {
            id: "4",
            name: "Fransiya",
            flag: "🇫🇷",
            population: 68000000,
            gdp: 2930000000000,
            militaryBudget: 59000000000,
            activeTroops: 270000,
            reserveTroops: 35000,
            powerIndex: 0.1281,
            region: "Yevropa",
            categories: ["Havo kuchlari", "Harbiy flot", "Zamonaviy texnika"],
            description: "Yevropaning yetakchi harbiy kuchlaridan biri",
            technologies: [
                {
                    id: "t13",
                    name: "Rafale Fighter",
                    type: "aircraft",
                    quantity: 102,
                    powerIndex: 88,
                    year: 2001,
                    country: "Fransiya",
                    category: "Havo kuchlari",
                },
                {
                    id: "t14",
                    name: "Charles de Gaulle Carrier",
                    type: "naval",
                    quantity: 1,
                    powerIndex: 89,
                    year: 2001,
                    country: "Fransiya",
                    category: "Harbiy flot",
                },
                {
                    id: "t15",
                    name: "Leclerc Tank",
                    type: "ground",
                    quantity: 222,
                    powerIndex: 86,
                    year: 1992,
                    country: "Fransiya",
                    category: "Zamonaviy texnika",
                },
            ],
        },
        {
            id: "5",
            name: "Buyuk Britaniya",
            flag: "🇬🇧",
            population: 67000000,
            gdp: 3130000000000,
            militaryBudget: 68000000000,
            activeTroops: 194000,
            reserveTroops: 80000,
            powerIndex: 0.1391,
            region: "Yevropa",
            categories: ["Havo kuchlari", "Harbiy flot", "Maxsus kuchlar"],
            description:
                "An'anaviy dengiz kuchlari va zamonaviy texnologiyalar",
            technologies: [
                {
                    id: "t16",
                    name: "Eurofighter Typhoon",
                    type: "aircraft",
                    quantity: 107,
                    powerIndex: 87,
                    year: 2003,
                    country: "Buyuk Britaniya",
                    category: "Havo kuchlari",
                },
                {
                    id: "t17",
                    name: "Queen Elizabeth Carrier",
                    type: "naval",
                    quantity: 2,
                    powerIndex: 90,
                    year: 2017,
                    country: "Buyuk Britaniya",
                    category: "Harbiy flot",
                },
                {
                    id: "t18",
                    name: "Challenger 2 Tank",
                    type: "ground",
                    quantity: 227,
                    powerIndex: 84,
                    year: 1998,
                    country: "Buyuk Britaniya",
                    category: "Maxsus kuchlar",
                },
            ],
        },
    ];

    useEffect(() => {
        setCountries(sampleData);
        setFilteredCountries(sampleData);
    }, []);

    useEffect(() => {
        let result = countries;

        if (searchTerm) {
            result = result.filter(
                (country) =>
                    country.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    country.region
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    country.categories.some((cat) =>
                        cat.toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );
        }

        if (selectedCategory) {
            result = result.filter((country) =>
                country.categories.includes(selectedCategory)
            );
        }

        setFilteredCountries(result);
    }, [searchTerm, selectedCategory, countries]);

    const toggleCountrySelection = (country: Country) => {
        if (selectedCountries.find((c) => c.id === country.id)) {
            setSelectedCountries(
                selectedCountries.filter((c) => c.id !== country.id)
            );
        } else if (selectedCountries.length < 5) {
            setSelectedCountries([...selectedCountries, country]);
        }
    };

    const removeCountry = (countryId: string) => {
        setSelectedCountries(
            selectedCountries.filter((c) => c.id !== countryId)
        );
    };

    const compareCountries = () => {
        if (selectedCountries.length < 2) return;

        // Harbiy kuch bo'yicha solishtirish
        const sortedByPower = [...selectedCountries].sort(
            (a, b) => a.powerIndex - b.powerIndex
        );
        const winner = sortedByPower[0];

        const reasons: string[] = [];
        const advantages: ComparisonResult["advantages"] = [];

        // Harbiy byudjet
        const budgetWinner = [...selectedCountries].sort(
            (a, b) => b.militaryBudget - a.militaryBudget
        )[0];
        if (budgetWinner.id === winner.id) {
            reasons.push(
                `Eng yuqori harbiy byudjet ($${formatNumber(
                    budgetWinner.militaryBudget
                )})`
            );
        }

        // Texnologiyalar bo'yicha solishtirish
        const allCategories = Array.from(
            new Set(selectedCountries.flatMap((c) => c.categories))
        );

        allCategories.forEach((category) => {
            const categoryTechs = selectedCountries.map((country) => ({
                country,
                techs: country.technologies.filter(
                    (tech) => tech.category === category
                ),
            }));

            const techPower = categoryTechs.map(({ country, techs }) => ({
                country,
                totalPower: techs.reduce(
                    (sum, tech) => sum + tech.powerIndex * tech.quantity,
                    0
                ),
            }));

            const categoryWinner = techPower.sort(
                (a, b) => b.totalPower - a.totalPower
            )[0];

            if (
                categoryWinner.country.id === winner.id &&
                categoryWinner.totalPower > 0
            ) {
                advantages.push({
                    category,
                    advantage: categoryWinner.totalPower,
                    winnerTech:
                        categoryTechs.find((ct) => ct.country.id === winner.id)
                            ?.techs || [],
                    loserTech:
                        categoryTechs.find((ct) => ct.country.id !== winner.id)
                            ?.techs || [],
                });

                reasons.push(`${category} sohasida ustunlik`);
            }
        });

        // Aholi va qo'shin soni
        if (
            winner.activeTroops ===
            Math.max(...selectedCountries.map((c) => c.activeTroops))
        ) {
            reasons.push(
                `Eng ko'p faol askarlar soni (${formatNumber(
                    winner.activeTroops
                )})`
            );
        }

        // Score calculation
        const score = Math.round((1 - winner.powerIndex) * 1000);

        setComparisonResult({
            winner,
            reasons,
            advantages,
            score,
        });
        setShowComparison(true);
        setActiveStep("comparison");
    };

    const resetSelection = () => {
        setSelectedCountries([]);
        setShowComparison(false);
        setComparisonResult(null);
        setActiveStep("selection");
    };

    const formatNumber = (num: number): string => {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
        return num.toString();
    };

    const getTechIcon = (type: string) => {
        switch (type) {
            case "aircraft":
                return <Plane className="w-4 h-4" />;
            case "naval":
                return <Ship className="w-4 h-4" />;
            case "ground":
                return <Truck className="w-4 h-4" />;
            case "missile":
                return <Target className="w-4 h-4" />;
            default:
                return <Zap className="w-4 h-4" />;
        }
    };

    const getAllCategories = () => {
        return Array.from(new Set(countries.flatMap((c) => c.categories)));
    };

    const getPowerLevel = (powerIndex: number) => {
        if (powerIndex < 0.05)
            return { text: "A'lo", color: "text-blue-100", bg: "bg-blue-900" };
        if (powerIndex < 0.08)
            return {
                text: "Yuqori",
                color: "text-blue-200",
                bg: "bg-blue-800",
            };
        if (powerIndex < 0.12)
            return { text: "O'rta", color: "text-blue-300", bg: "bg-blue-700" };
        return { text: "Past", color: "text-blue-400", bg: "bg-blue-600" };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 bg-blue-800/50 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-2xl border border-blue-600/30 mb-6">
                        <Shield className="w-10 h-10 text-blue-200" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent">
                            Harbiy Kuch Solishtirish
                        </h1>
                        <Sword className="w-10 h-10 text-blue-200" />
                    </div>
                    <p className="text-blue-200 text-xl max-w-2xl mx-auto leading-relaxed">
                        Dunyo davlatlarining harbiy qudratini 5 tagacha davlatni
                        tanlab, chuqur tahlil qilish va solishtirish imkoniyati
                    </p>
                </div>

                {/* Navigation Steps */}
                <div className="flex justify-center mb-12">
                    <div className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-blue-600/30">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveStep("selection")}
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                                    activeStep === "selection"
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                        : "text-blue-200 hover:bg-blue-700/50"
                                }`}
                            >
                                <Globe className="w-6 h-6" />
                                Davlat Tanlash
                            </button>
                            <button
                                onClick={() =>
                                    selectedCountries.length >= 2 &&
                                    setActiveStep("comparison")
                                }
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                                    activeStep === "comparison"
                                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                        : selectedCountries.length >= 2
                                        ? "text-blue-200 hover:bg-blue-700/50"
                                        : "text-blue-400 cursor-not-allowed"
                                }`}
                            >
                                <BarChart className="w-6 h-6" />
                                Natijalar
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        activeStep === "comparison"
                                            ? "bg-white text-blue-600"
                                            : "bg-blue-500 text-white"
                                    }`}
                                >
                                    {selectedCountries.length}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {activeStep === "selection" && (
                    <>
                        {/* Filters Section */}
                        <div className="bg-blue-800/40 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-blue-600/30">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                {/* Search */}
                                <div className="lg:col-span-2">
                                    <label className="block text-blue-100 font-semibold mb-3 text-lg">
                                        <Search className="w-5 h-5 inline mr-2" />
                                        Qidiruv
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Davlat, mintaqa yoki kategoriya..."
                                            className="w-full pl-12 pr-4 py-4 bg-blue-700/50 border-2 border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg text-white placeholder-blue-300 backdrop-blur-sm transition-all duration-300"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <label className="block text-blue-100 font-semibold mb-3 text-lg">
                                        <SlidersHorizontal className="w-5 h-5 inline mr-2" />
                                        Kategoriya
                                    </label>
                                    <select
                                        className="w-full px-4 py-4 bg-blue-700/50 border-2 border-blue-600/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg text-white backdrop-blur-sm transition-all duration-300"
                                        value={selectedCategory}
                                        onChange={(e) =>
                                            setSelectedCategory(e.target.value)
                                        }
                                    >
                                        <option
                                            value=""
                                            className="bg-blue-800"
                                        >
                                            Barcha kategoriyalar
                                        </option>
                                        {getAllCategories().map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                                className="bg-blue-800"
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Selection Status */}
                                <div className="bg-gradient-to-r from-blue-700/50 to-blue-600/50 rounded-xl p-6 border-2 border-blue-500/30 backdrop-blur-sm">
                                    <div className="text-center">
                                        <div className="text-blue-100 font-bold text-3xl mb-2">
                                            {selectedCountries.length}/5
                                        </div>
                                        <div className="text-blue-200 font-semibold">
                                            Tanlangan
                                        </div>
                                        {selectedCountries.length >= 2 && (
                                            <button
                                                onClick={compareCountries}
                                                className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                                            >
                                                <BarChart className="w-5 h-5 inline mr-2" />
                                                Solishtirishni Boshlash
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Selected Countries Preview */}
                        {selectedCountries.length > 0 && (
                            <div className="bg-blue-800/40 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-blue-600/30">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-blue-100 flex items-center gap-3">
                                        <Check className="w-7 h-7 text-green-400" />
                                        Tanlangan Davlatlar
                                    </h2>
                                    <span className="bg-blue-700/50 text-blue-100 px-4 py-2 rounded-full font-semibold border border-blue-600/30">
                                        {selectedCountries.length} ta
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {selectedCountries.map((country) => (
                                        <div
                                            key={country.id}
                                            className="flex items-center gap-4 bg-gradient-to-r from-blue-700/50 to-blue-600/50 rounded-2xl px-6 py-4 border-2 border-blue-500/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-blue-400/50"
                                        >
                                            <span className="text-3xl">
                                                {country.flag}
                                            </span>
                                            <div>
                                                <div className="font-bold text-blue-100 text-lg">
                                                    {country.name}
                                                </div>
                                                <div className="text-blue-300 text-sm">
                                                    {country.region}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeCountry(country.id)
                                                }
                                                className="text-blue-300 hover:text-red-400 transition-colors duration-200 ml-2"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Countries Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredCountries.map((country) => {
                                const powerLevel = getPowerLevel(
                                    country.powerIndex
                                );
                                return (
                                    <div
                                        key={country.id}
                                        onClick={() =>
                                            toggleCountrySelection(country)
                                        }
                                        className={`bg-blue-800/40 backdrop-blur-sm rounded-2xl shadow-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                                            selectedCountries.find(
                                                (c) => c.id === country.id
                                            )
                                                ? "border-blue-400 ring-4 ring-blue-500/20"
                                                : "border-blue-600/30 hover:border-blue-400/50"
                                        }`}
                                    >
                                        <div className="p-6">
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-4xl">
                                                        {country.flag}
                                                    </span>
                                                    <div>
                                                        <h3 className="font-bold text-xl text-blue-100">
                                                            {country.name}
                                                        </h3>
                                                        <p className="text-blue-300 flex items-center gap-1 text-sm">
                                                            <Map className="w-4 h-4" />
                                                            {country.region}
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedCountries.find(
                                                    (c) => c.id === country.id
                                                ) ? (
                                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <Check className="w-5 h-5 text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 border-2 border-blue-400/50 rounded-full transition-colors hover:border-blue-300" />
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                                                {country.description}
                                            </p>

                                            {/* Power Index */}
                                            <div className="bg-gradient-to-r from-blue-700/50 to-blue-600/50 rounded-xl p-4 mb-4 border border-blue-500/30">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-blue-100">
                                                        Harbiy Kuch
                                                    </span>
                                                    <div className="text-right">
                                                        <div className="font-bold text-blue-50 text-lg">
                                                            {country.powerIndex.toFixed(
                                                                4
                                                            )}
                                                        </div>
                                                        <div
                                                            className={`text-sm font-semibold ${powerLevel.color}`}
                                                        >
                                                            {powerLevel.text}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Categories */}
                                            <div className="mb-4">
                                                <h4 className="font-semibold text-blue-100 mb-3 flex items-center gap-2">
                                                    <Zap className="w-4 h-4" />
                                                    Kuchli Tomonlari
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {country.categories.map(
                                                        (category) => (
                                                            <span
                                                                key={category}
                                                                className="px-3 py-1 bg-blue-700/50 text-blue-200 rounded-full text-sm font-medium border border-blue-600/30"
                                                            >
                                                                {category}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quick Stats */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="text-center p-3 bg-blue-700/30 rounded-lg border border-blue-600/30">
                                                    <Users className="w-5 h-5 text-blue-200 mx-auto mb-2" />
                                                    <div className="font-bold text-blue-100">
                                                        {formatNumber(
                                                            country.population
                                                        )}
                                                    </div>
                                                    <div className="text-blue-300 text-xs font-medium">
                                                        Aholi
                                                    </div>
                                                </div>
                                                <div className="text-center p-3 bg-blue-700/30 rounded-lg border border-blue-600/30">
                                                    <DollarSign className="w-5 h-5 text-blue-200 mx-auto mb-2" />
                                                    <div className="font-bold text-blue-100">
                                                        $
                                                        {formatNumber(
                                                            country.militaryBudget
                                                        )}
                                                    </div>
                                                    <div className="text-blue-300 text-xs font-medium">
                                                        Byudjet
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {activeStep === "comparison" && comparisonResult && (
                    <div className="bg-blue-800/40 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-blue-600/30">
                        {/* Winner Announcement */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-12 py-6 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
                                <Trophy className="w-12 h-12 text-yellow-300" />
                                <h2 className="text-4xl font-bold">
                                    ENG KUCHLI DAVLAT
                                </h2>
                                <Trophy className="w-12 h-12 text-yellow-300" />
                            </div>
                            <div className="flex items-center justify-center gap-6 mb-4">
                                <span className="text-8xl">
                                    {comparisonResult.winner.flag}
                                </span>
                                <div>
                                    <h3 className="text-6xl font-bold text-white mb-2">
                                        {comparisonResult.winner.name}
                                    </h3>
                                    <p className="text-2xl text-blue-200">
                                        Harbiy kuch indeksi:{" "}
                                        {comparisonResult.winner.powerIndex.toFixed(
                                            4
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-700/50 rounded-2xl p-6 inline-flex items-center gap-6 border border-blue-600/30">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white">
                                        {comparisonResult.score}
                                    </div>
                                    <div className="text-blue-200 font-semibold text-lg">
                                        Umumiy Ball
                                    </div>
                                </div>
                                <div className="h-16 w-px bg-blue-500/50"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">
                                        {comparisonResult.reasons.length}
                                    </div>
                                    <div className="text-blue-200 font-semibold text-lg">
                                        Ustunliklar
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advantages Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {/* Reasons */}
                            <div className="bg-gradient-to-br from-blue-700/50 to-blue-600/50 rounded-2xl p-6 border border-blue-500/30">
                                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <TrendingUp className="w-8 h-8 text-blue-200" />
                                    G'alaba Sabablari
                                </h4>
                                <div className="space-y-4">
                                    {comparisonResult.reasons.map(
                                        (reason, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 bg-blue-800/30 rounded-xl p-4 shadow-lg border border-blue-600/30"
                                            >
                                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-blue-100 font-medium leading-relaxed text-lg">
                                                    {reason}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Technological Advantages */}
                            <div className="bg-gradient-to-br from-blue-700/50 to-blue-600/50 rounded-2xl p-6 border border-blue-500/30">
                                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Sword className="w-8 h-8 text-blue-200" />
                                    Texnologik Ustunliklar
                                </h4>
                                <div className="space-y-4">
                                    {comparisonResult.advantages.map(
                                        (advantage, index) => (
                                            <div
                                                key={index}
                                                className="bg-blue-800/30 rounded-xl p-4 shadow-lg border border-blue-600/30"
                                            >
                                                <div className="font-bold text-white text-xl mb-2">
                                                    {advantage.category}
                                                </div>
                                                <div className="text-blue-200 text-lg">
                                                    {
                                                        advantage.winnerTech
                                                            .length
                                                    }{" "}
                                                    xil zamonaviy texnika •
                                                    <span className="font-semibold ml-2 text-green-300">
                                                        +
                                                        {Math.round(
                                                            advantage.advantage
                                                        )}{" "}
                                                        ball
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* All Compared Countries */}
                        <div className="border-t border-blue-600/30 pt-8">
                            <h4 className="text-3xl font-bold text-white mb-8 text-center">
                                Barcha Qatnashchi Davlatlar
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedCountries.map((country, index) => (
                                    <div
                                        key={country.id}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                                            country.id ===
                                            comparisonResult.winner.id
                                                ? "border-blue-400 bg-gradient-to-br from-blue-600/50 to-blue-500/50 shadow-2xl"
                                                : "border-blue-600/30 bg-blue-800/40 hover:shadow-lg"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-4xl">
                                                {country.flag}
                                            </span>
                                            <div className="flex-1">
                                                <div className="font-bold text-white text-2xl">
                                                    {country.name}
                                                </div>
                                                <div className="text-blue-300 text-lg">
                                                    {country.region}
                                                </div>
                                            </div>
                                            {country.id ===
                                            comparisonResult.winner.id ? (
                                                <Award className="w-10 h-10 text-yellow-400" />
                                            ) : (
                                                <div className="w-10 h-10 bg-blue-700/50 rounded-full flex items-center justify-center text-white font-bold text-lg border border-blue-600/30">
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-lg">
                                            <div className="text-center p-3 bg-blue-700/30 rounded-lg border border-blue-600/30">
                                                <div className="font-bold text-white">
                                                    {country.powerIndex.toFixed(
                                                        4
                                                    )}
                                                </div>
                                                <div className="text-blue-300">
                                                    Kuch
                                                </div>
                                            </div>
                                            <div className="text-center p-3 bg-blue-700/30 rounded-lg border border-blue-600/30">
                                                <div className="font-bold text-white">
                                                    $
                                                    {formatNumber(
                                                        country.militaryBudget
                                                    )}
                                                </div>
                                                <div className="text-blue-300">
                                                    Byudjet
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-6 mt-12">
                            <button
                                onClick={resetSelection}
                                className="flex items-center gap-3 px-10 py-5 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25"
                            >
                                <Plus className="w-7 h-7" />
                                Yangi Solishtirish
                            </button>
                            <button className="flex items-center gap-3 px-10 py-5 bg-blue-700/50 hover:bg-blue-600/50 text-blue-100 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 border-blue-600/30 hover:border-blue-500/50 shadow-2xl backdrop-blur-sm">
                                <Download className="w-7 h-7" />
                                Natijani Yuklab Olish
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompCountries;
