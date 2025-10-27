import React from "react";

const Home_temp1: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#002664] to-[#C8102E] text-white py-4 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <i className="fas fa-shield-alt text-2xl text-yellow-400"></i>
                        <h1 className="text-2xl font-bold tracking-wide">
                            MARINES
                        </h1>
                    </div>

                    <nav className="w-full md:w-auto">
                        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
                            <li>
                                <a
                                    href="#about"
                                    className="font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 py-2 block"
                                >
                                    ABOUT THE MARINE CORPS
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#life"
                                    className="font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 py-2 block"
                                >
                                    LIFE AS A MARINE
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#become"
                                    className="font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 py-2 block"
                                >
                                    BECOME A MARINE
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#partner"
                                    className="font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 py-2 block"
                                >
                                    PARTNER & FAMILIES
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#explore"
                                    className="font-semibold text-lg hover:text-yellow-400 transition-colors duration-300 py-2 block"
                                >
                                    EXPLORE THE CORPS
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <button className="md:hidden text-white text-xl">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1547234931-12deb4679e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] text-white py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6">
                        CONSTANT AMIDST THE UNCERTAIN
                    </h2>
                    <p className="text-xl mb-8 leading-relaxed">
                        AS THE THREATS SHIFT, MARINES ADAPT TO PROTECT OUR
                        NATION
                    </p>
                    <a
                        href="#become"
                        className="bg-[#C8102E] text-white px-8 py-3 rounded font-bold text-lg border-2 border-[#C8102E] hover:bg-transparent hover:border-white transition-all duration-300 inline-block"
                    >
                        JOIN THE MARINES
                    </a>
                </div>
            </section>

            {/* About the Marine Corps Section */}
            <section id="about" className="py-16 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002664] inline-block pb-2 border-b-4 border-[#C8102E]">
                        ABOUT THE MARINE CORPS
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#002664] mb-6">
                            The Few. The Proud.
                        </h3>
                        <p className="text-lg mb-4">
                            The United States Marine Corps is a branch of the
                            United States Armed Forces responsible for providing
                            power projection from the sea, using the mobility of
                            the U.S. Navy to rapidly deliver combined-arms task
                            forces.
                        </p>
                        <p className="text-lg mb-4">
                            Founded in 1775, the Marine Corps has been at the
                            forefront of American military engagements for over
                            two centuries, earning a reputation for discipline,
                            dedication, and valor.
                        </p>
                        <p className="text-lg">
                            Marines are trained to improvise, adapt and overcome
                            any obstacle in whatever situation they are faced
                            with. This ability to rapidly respond to evolving
                            threats is what makes the Marine Corps a vital
                            component of U.S. national security.
                        </p>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1547234931-12deb4679e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Marines in formation"
                            className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* Life as a Marine Section */}
            <section id="life" className="py-16 px-4 bg-[#002664] text-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white inline-block pb-2 border-b-4 border-yellow-400">
                        LIFE AS A MARINE
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/10 p-8 rounded-lg text-center transition-transform duration-300 hover:-translate-y-2 hover:bg-white/15">
                        <i className="fas fa-graduation-cap text-5xl text-yellow-400 mb-6"></i>
                        <h3 className="text-2xl font-bold mb-4">
                            TRAINING & EDUCATION
                        </h3>
                        <p>
                            Continuous training and professional development to
                            maintain the highest level of readiness and
                            expertise.
                        </p>
                    </div>

                    <div className="bg-white/10 p-8 rounded-lg text-center transition-transform duration-300 hover:-translate-y-2 hover:bg-white/15">
                        <i className="fas fa-users text-5xl text-yellow-400 mb-6"></i>
                        <h3 className="text-2xl font-bold mb-4">BROTHERHOOD</h3>
                        <p>
                            Join a tight-knit community built on trust, loyalty,
                            and shared commitment to the mission.
                        </p>
                    </div>

                    <div className="bg-white/10 p-8 rounded-lg text-center transition-transform duration-300 hover:-translate-y-2 hover:bg-white/15">
                        <i className="fas fa-medal text-5xl text-yellow-400 mb-6"></i>
                        <h3 className="text-2xl font-bold mb-4">
                            CAREER ADVANCEMENT
                        </h3>
                        <p>
                            Clear paths for promotion and specialization in
                            various military occupational specialties.
                        </p>
                    </div>
                </div>
            </section>

            {/* Become a Marine Section */}
            <section id="become" className="py-16 px-4 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002664] inline-block pb-2 border-b-4 border-[#C8102E]">
                        BECOME A MARINE
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                            <div className="bg-[#C8102E] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#002664] mb-2">
                                    CONTACT A RECRUITER
                                </h3>
                                <p>
                                    Speak with a Marine recruiter to learn about
                                    requirements and opportunities.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                            <div className="bg-[#C8102E] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#002664] mb-2">
                                    MEET REQUIREMENTS
                                </h3>
                                <p>
                                    Ensure you meet age, education, physical and
                                    legal requirements.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                            <div className="bg-[#C8102E] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#002664] mb-2">
                                    ATTEND BOOT CAMP
                                </h3>
                                <p>
                                    Complete the 13-week transformative training
                                    at Marine Corps Recruit Depot.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                            <div className="bg-[#C8102E] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#002664] mb-2">
                                    SERVE WITH HONOR
                                </h3>
                                <p>
                                    Begin your career as a United States Marine,
                                    defending the nation and its interests.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg overflow-hidden shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1582059249942-5f36dc9ef8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Marine in uniform"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Partner & Families Section */}
            <section
                id="partner"
                className="py-16 px-4 bg-[#002664] text-white"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white inline-block pb-2 border-b-4 border-yellow-400">
                        PARTNER & FAMILIES
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white/10 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                            FAMILY SUPPORT
                        </h3>
                        <p>
                            The Marine Corps provides comprehensive support
                            programs for families, including counseling,
                            education assistance, and community resources to
                            help navigate military life.
                        </p>
                    </div>

                    <div className="bg-white/10 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                            HEALTH & WELLNESS
                        </h3>
                        <p>
                            Access to quality healthcare through TRICARE,
                            wellness programs, and resources to maintain
                            physical and mental health for service members and
                            their families.
                        </p>
                    </div>
                </div>
            </section>

            {/* Explore the Corps Section */}
            <section id="explore" className="py-16 px-4 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#002664] inline-block pb-2 border-b-4 border-[#C8102E]">
                        EXPLORE THE CORPS
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                        <div className="h-48 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1547234931-12deb4679e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Marine Corps history"
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#002664] mb-3">
                                HISTORY & TRADITIONS
                            </h3>
                            <p>
                                Explore the rich history, customs, and
                                traditions that have defined the Marine Corps
                                for centuries.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                        <div className="h-48 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1582059249942-5f36dc9ef8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Marine equipment"
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#002664] mb-3">
                                EQUIPMENT & TECHNOLOGY
                            </h3>
                            <p>
                                Discover the advanced weapons, vehicles, and
                                technology that give Marines the tactical edge.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                        <div className="h-48 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1547234931-12deb4679e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Marine careers"
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#002664] mb-3">
                                CAREER PATHS
                            </h3>
                            <p>
                                Learn about the diverse career opportunities and
                                specialties available in the Marine Corps.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-black/80 to-black/80 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1582059249942-5f36dc9ef8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed">
                        "CONSTANT AMIDST THE UNCERTAIN"
                    </h2>
                    <p className="text-xl italic text-yellow-400">
                        AS THE THREATS SHIFT, MARINES ADAPT TO PROTECT OUR
                        NATION
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white pt-16 pb-8 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 pb-2 border-b-2 border-[#C8102E] mb-6">
                            MARINE CORPS
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Leadership
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    News
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 pb-2 border-b-2 border-[#C8102E] mb-6">
                            QUICK LINKS
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#about"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    About the Marine Corps
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#life"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Life as a Marine
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#become"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Become a Marine
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#partner"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Partner & Families
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 pb-2 border-b-2 border-[#C8102E] mb-6">
                            RESOURCES
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    Glossary
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-yellow-400 pb-2 border-b-2 border-[#C8102E] mb-6">
                            CONNECT WITH US
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Follow the Marine Corps on social media for the
                            latest updates and news.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#C8102E] transition-colors duration-300"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#C8102E] transition-colors duration-300"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#C8102E] transition-colors duration-300"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#C8102E] transition-colors duration-300"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>
                        &copy; 2023 United States Marine Corps. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home_temp1;
