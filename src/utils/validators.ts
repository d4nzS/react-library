export const PHONE_PATTERN = /^\+\d{1,3} \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const hasLatinLetter = (value: string): boolean => {
    return /[a-z]/i.test(value);
};

export const hasNumber = (value: string): boolean => {
    return /\d/.test(value);
};

export const hasCapitalLetter = (value: string): boolean => {
    return /[A-ZА-Я]/.test(value);
};
