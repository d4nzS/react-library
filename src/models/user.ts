interface UserBook {
    issueYear?: string;
    rating?: number;
    title: string;
    authors?: string[];
    image?: string;
    categories?: string[];
    id: number;
}

export interface UserBooking {
    id?: string;
    order?: boolean;
    dateOrder?: string;
    book?: UserBook;
}

export interface UserDelivery {
    id?: string;
    handed?: boolean;
    dateHandedFrom?: string;
    dateHandedTo?: string;
    book?: UserBook;
}

export interface UserHistory {
    id?: string;
    books?: UserBook[];
}

export interface UserComment {
    id: number;
    rating: number;
    text?: string;
    bookId: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string;
    booking: UserBooking;
    delivery: UserDelivery;
    history: UserHistory;
    comments: UserComment[];
}

export default User;
