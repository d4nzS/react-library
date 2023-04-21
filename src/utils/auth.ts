export let token = localStorage.getItem('token');
export let id = localStorage.getItem('userId');

export const login = (jwtToken: string, userId: string): void => {
    token = jwtToken;
    id = userId;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
};

export const isAuthenticated = (): boolean => {
    return !!(token && id);
};

export const logout = (): void => {
    token = null;
    id = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};

export const getCurrentUserId = (): string => {
    return id!;
};
