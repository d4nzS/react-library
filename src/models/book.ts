import { BookItem, Image } from './books';

interface User {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
}

export interface Comment {
    id: number;
    rating: number;
    text?: string;
    createdAt: string;
    user: User;
}

interface Book extends BookItem {
    description?: string;
    publish?: string;
    pages?: string;
    cover?: string;
    weight?: string;
    format?: string;
    ISBN?: string;
    producer?: string;
    images?: Image[];
    comments?: Comment[];
}

export default Book;
