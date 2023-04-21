const getObjectFromFormData = (formData: FormData): object => {
    return Object.fromEntries(formData.entries());
};

export default getObjectFromFormData;
