export interface Country {
    id: string;
    name: string;
    flag: string;
    flagImage: string; // Bayroq rasmi
}

export interface Vehicle {
    id: string;
    name: string;
    type: string;
    country: string; // country ID
    manufacturerCountry: string; // Ishlab chiqargan davlat nomi
    manufacturerCountryFlag: string; // Ishlab chiqargan davlat bayrog'i rasmi
    image: string;
    shortDescription: string;
    specifications: {
        manufacturer: string;
        firstFlight: string;
        status: string;
        primaryUser: string;
        crew: string;
        length: string;
        wingspan: string;
        height: string;
        maxSpeed: string;
        range: string;
    };
}

export interface CountryA {
    id: string;
    name: string;
    englishName: string;
    flag: string;
    categories: string[]; // Har bir davlatning o'ziga xos bo'limlari
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    count: number;
}
