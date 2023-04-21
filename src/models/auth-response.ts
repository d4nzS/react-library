interface User {
    id: string;
    username: string;
    email: string;
    provider: string,
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface AuthResponse {
    jwt: string;
    user: User;
}

export default AuthResponse;
