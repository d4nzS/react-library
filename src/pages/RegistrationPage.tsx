import { FC } from 'react';
import { ActionFunctionArgs } from 'react-router-dom';
import { AxiosError } from 'axios';

import Registration from '../components/Auth/Registration/Registration';
import getObjectFromFormData from '../utils/get-object-from-form-data';
import UserRegistrationData from '../models/user-registration-data';
import AuthService from '../services/auth-service';

const RegistrationPage: FC = () => {
    return <Registration/>;
};

export default RegistrationPage;

export const registrationAction = async ({ request }: ActionFunctionArgs) => {
    const data = getObjectFromFormData(await request.formData()) as UserRegistrationData;
    let response: any = {
        isSucceed: true
    };

    try {
        await AuthService.register(data);
    } catch (err) {
        response = { errStatus: (err as AxiosError).response!.status };
    }

    return response;
};
