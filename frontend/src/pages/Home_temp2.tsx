import React from "react";
import { useState } from "react";

// Interface propslari
interface HomeProps {
    userName?: string;
    isLoggedIn?: boolean;
    onLogin?: () => void;
    onLogout?: () => void;
}

// Card komponenti uchun interface
interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

// Stats komponenti uchun interface
interface StatsProps {
    title: string;
    value: string | number;
    change?: string;
    isPositive?: boolean;
}

// Asosiy Home komponenti
const Home_temp2: React.FC<HomeProps> = ({
    userName = "Mehmon",
    isLoggedIn = false,
    onLogin = () => console.log("Login bosildi"),
    onLogout = () => console.log("Logout bosildi"),
}) => {
    const [activeTab, setActiveTab] = useState<string>("bosh-sahifa");

    // Stats ma'lumotlari
    const statsData: StatsProps[] = [
        {
            title: "Bugun tashriflar",
            value: "1,234",
            change: "+12%",
            isPositive: true,
        },
        {
            title: "Aktiv foydalanuvchilar",
            value: "567",
            change: "+5%",
            isPositive: true,
        },
        {
            title: "O'rtacha vaqt",
            value: "4:32",
            change: "-2%",
            isPositive: false,
        },
        { title: "Daromad", value: "$12,345", change: "+8%", isPositive: true },
    ];

    // Card ma'lumotlari
    const cardData: CardProps[] = [
        {
            title: "Profil",
            description: "Shaxsiy ma'lumotlaringizni boshqaring",
            icon: "👤",
        },
        {
            title: "Sozlamalar",
            description: "Tizim sozlamalarini o'zgartiring",
            icon: "⚙️",
        },
        {
            title: "Yordam",
            description: "Yordam va qo'llanmalar",
            icon: "❓",
        },
        {
            title: "Xabarlar",
            description: "Shaxsiy xabarlaringiz",
            icon: "✉️",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-blue-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    L
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-blue-800">
                                Logo
                            </h1>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            {["bosh-sahifa", "xizmatlar", "blog", "aloqa"].map(
                                (tab) => (
                                    <button
                                        key={tab}
                                        className={`capitalize font-medium transition-colors ${
                                            activeTab === tab
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-600 hover:text-blue-500"
                                        }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.replace("-", " ")}
                                    </button>
                                )
                            )}
                        </nav>

                        <div className="flex items-center space-x-4">
                            {isLoggedIn ? (
                                <>
                                    <span className="text-gray-700">
                                        Xush kelibsiz,{" "}
                                        <strong>{userName}</strong>
                                    </span>
                                    <button
                                        onClick={onLogout}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Chiqish
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={onLogin}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Kirish
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Bizning Platformamizga Xush Kelibsiz
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Eng yangi texnologiyalar va zamonaviy yechimlar bilan
                        tanishishingiz mumkin
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors">
                            Boshlash
                        </button>
                        <button className="bg-transparent border-2 border-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg transition-colors">
                            Ko'proq o'rganish
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
                        Statistika
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statsData.map((stat, index) => (
                            <StatsCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                change={stat.change}
                                isPositive={stat.isPositive}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section className="py-12 bg-blue-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
                        Xizmatlar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                title={card.title}
                                description={card.description}
                                icon={card.icon}
                                onClick={() =>
                                    console.log(`${card.title} bosildi`)
                                }
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Logo</h3>
                            <p className="text-blue-200">
                                Biz eng yaxshi xizmatlarni taqdim etamiz va
                                mijozlarimizning ehtiyojlarini qondiramiz.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">
                                Tez havolalar
                            </h4>
                            <ul className="space-y-2 text-blue-200">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Bosh sahifa
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Xizmatlar
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Narxlar
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Aloqa</h4>
                            <ul className="space-y-2 text-blue-200">
                                <li>+998 90 123 45 67</li>
                                <li>info@example.uz</li>
                                <li>Toshkent shahar, Yunusobod tumani</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">
                                Obuna bo'lish
                            </h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email manzilingiz"
                                    className="px-4 py-2 rounded-l-lg text-gray-800 w-full"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                                    Yuborish
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300">
                        <p>&copy; 2023 Logo. Barcha huquqlar himoyalangan.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Stats Card komponenti
const StatsCard: React.FC<StatsProps> = ({
    title,
    value,
    change,
    isPositive,
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 text-center">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
            <p className="text-3xl font-bold text-blue-800 mb-2">{value}</p>
            {change && (
                <p
                    className={`text-sm font-medium ${
                        isPositive ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {isPositive ? "↑" : "↓"} {change}
                </p>
            )}
        </div>
    );
};

// Card komponenti
const Card: React.FC<CardProps> = ({ title, description, icon, onClick }) => {
    return (
        <div
            className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default Home_temp2;
