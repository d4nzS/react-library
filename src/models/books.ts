export interface Image {
    url?: string;
}

export interface Booking {
    id: number;
    order: boolean;
    dateOrder?: string;
    customerId?: number;
    customerFirstName?: string;
    customerLastName?: string;
}

export interface Delivery {
    id: number;
    handed: boolean;
    dateHandedFrom?: string;
    dateHandedTo?: string;
    recipientId?: number;
    recipientFirstName?: string;
    recipientLastName?: string;
}

export interface History {
    id?: string;
    userId?: string;
}

export interface BookItem {
    issueYear?: string;
    rating?: number;
    title: string;
    authors?: string[];
    image?: Image;
    categories?: string[];
    id: number;
    booking?: Booking;
    delivery?: Delivery;
    histories?: History[];
}

type Books = BookItem[];

export default Books;
