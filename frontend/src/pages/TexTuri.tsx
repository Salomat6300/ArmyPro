// TextUri.tsx
import React, { useState, useRef, useEffect } from "react";

// Types
interface Section {
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
    stats: { label: string; value: string }[];
    image: string;
}

// Main component
const TexTuri: React.FC = () => {
    const [activeSection, setActiveSection] = useState<number>(1);
    const [isScrolled, setIsScrolled] = useState(false);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const sections: Section[] = [
        {
            id: 1,
            title: "Havo hujumidan mudofaa vositalari",
            description:
                "Zamonaviy havo mudofaa tizimlari, raketa komplekslari va radar tizimlari.",
            icon: "🛡️",
            features: ["Raketa mudofaa tizimlari", "Radar kuzatish tizimlari"],
            image: "https://media.gettyimages.com/id/1229063512/photo/national-air-defence-exercise-resilient-guard-2020.jpg?s=2048x2048&w=gi&k=20&c=HgI2DXSvGv1vtTqgqrvVU-6VhjuVrhr9u2vc1PFZtRY=",
            stats: [],
        },
        {
            id: 2,
            title: "Jangovar samolyotlari",
            description:
                "5-avlod qiruvchi samolyotlar, hujumchi va o'quv-jangovar samolyotlar.",
            icon: "✈️",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3BhPkLz_3-MzHmWhYAg_oxchX2S5T428tHg&s",
            features: [],
            stats: [],
        },
        {
            id: 3,
            title: "Harbiy transport samalyotlari",
            description:
                "Strategik va taktik transport samolyotlari, yuk tashish va desant qo'shinlarni tashish.",
            icon: "📦",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/IAF-C-17.jpg/250px-IAF-C-17.jpg",
            features: [],
            stats: [],
        },
        {
            id: 4,
            title: "Uchuvchisiz uchish apparatlari",
            description:
                "Taktik, strategik UAVlar va dronlar. Razvedka, kuzatish va zarba berish operatsiyalari.",
            icon: "🛸",
            features: [],
            stats: [],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Spying_quadcopter_%28cropped%29.jpg/500px-Spying_quadcopter_%28cropped%29.jpg",
        },
        {
            id: 5,
            title: "Vertolyotlar",
            description:
                "Hujum, razvedka, transport va qutqaruv vertolyotlari. Har qanday ob-havo sharoitida operatsiyalar.",
            icon: "🚁",
            features: [],
            stats: [],
            image: "data:image/jpeg;base64,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",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: number) => {
        setActiveSection(id);
        const element = sectionRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Rasm komponenti
    const SectionImage: React.FC<{ section: Section }> = ({ section }) => {
        const [imageError, setImageError] = useState(false);
        const [imageLoaded, setImageLoaded] = useState(false);

        // Rasm yo'lini tekshirish
        console.log(`Trying to load image: ${section.image}`);

        return (
            <div className="relative w-full h-80 rounded-3xl border border-white/10 overflow-hidden">
                {!imageError ? (
                    <>
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center">
                                <div className="text-6xl animate-pulse">
                                    {section.icon}
                                </div>
                            </div>
                        )}
                        <img
                            src={section.image}
                            alt={section.title}
                            className={`w-full h-full object-cover ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => {
                                console.log(
                                    `Image loaded successfully: ${section.image}`
                                );
                                setImageLoaded(true);
                            }}
                            onError={(e) => {
                                console.error(
                                    `Failed to load image: ${section.image}`
                                );
                                setImageError(true);
                                setImageLoaded(true);
                            }}
                        />
                    </>
                ) : (
                    // Fallback - agar rasm yuklanmasa
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">{section.icon}</div>
                            <div className="text-blue-200 text-sm">
                                Rasm mavjud emas
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                            Havo hujumidan mudofaa qurollari va harbiy havo
                            kuchlari aviatsiya texnikalari
                        </span>
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="group p-4 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {section.icon}
                                </div>
                                <div className="text-blue-200 group-hover:text-white text-sm font-medium">
                                    {section.title}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        ref={(el) => {
                            sectionRefs.current[section.id] = el;
                        }}
                        className="mb-32 scroll-mt-32"
                    >
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content Side */}
                            <div
                                className={`space-y-8 ${
                                    index % 2 === 1 ? "lg:order-2" : ""
                                }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            {section.title}
                                        </h2>
                                        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mt-2"></div>
                                    </div>
                                </div>

                                <p className="text-lg text-blue-100 leading-relaxed">
                                    {section.description}
                                </p>

                                <div className="flex space-x-4 pt-4">
                                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                                        Batafsil ma'lumot
                                    </button>
                                </div>
                            </div>

                            {/* Visual Side */}
                            <div
                                className={`relative ${
                                    index % 2 === 1 ? "lg:order-1" : ""
                                }`}
                            >
                                <div className="relative">
                                    <SectionImage section={section} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-3xl"></div>

                                    {/* Floating elements */}
                                    <div className="absolute -top-4 -right-4 w-17 h-17 bg-blue-500/30 rounded-2xl backdrop-blur-lg border border-blue-400/30 flex items-center justify-center text-2xl">
                                        ⚡
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 w-17 h-17 bg-cyan-400/30 rounded-2xl backdrop-blur-lg border border-cyan-300/30 flex items-center justify-center text-xl">
                                        🛡️
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-slate-800/50 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        ⚡
                                    </span>
                                </div>
                                <span className="text-white font-bold text-xl">
                                    Harbiy Aviatsiya
                                </span>
                            </div>
                            <p className="text-blue-200">
                                Zamonaviy harbiy aviatsiya texnologiyalari va
                                mudofaa tizimlari
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">
                                Bo'limlar
                            </h3>
                            <div className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() =>
                                            scrollToSection(section.id)
                                        }
                                        className="block text-blue-200 hover:text-white transition-colors duration-200"
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">
                                Aloqa
                            </h3>
                            <div className="text-blue-200 space-y-2">
                                <div>+998 97 123 45 67</div>
                                <div>info@harbiy-aviatsiya.uz</div>
                                <div>Toshkent, O'zbekiston</div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-blue-300">
                        <p>&copy; 2025 Harbiy Aviatsiya.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TexTuri;
