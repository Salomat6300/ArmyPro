export interface Vehicle {
    id: string;
    name: string;
    type: string;
    country: string;
    image: string;
    shortDescription: string;
    fullDescription?: string; // Yangi maydon
    specifications: {
        manufacturer: string;
        firstFlight: string;
        status: string;
        primaryUser: string;
        crew: string;
        length: string;
        wingspan: string;
        height: string;
        maxSpeed?: string;
        range?: string;
        weight?: string;
        engine?: string;
        armament?: string;
    };
}

export interface Country {
    id: string;
    name: string;
    flag: string;
}
