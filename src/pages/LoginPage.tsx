import { FC } from 'react';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { AxiosError } from 'axios';

import Login from '../components/Auth/Login/Login';
import getObjectFromFormData from '../utils/get-object-from-form-data';
import UserLoginData from '../models/user-login-data';
import AuthService from '../services/auth-service';
import { login } from '../utils/auth';

const LoginPage: FC = () => {
    return <Login/>;
};

export default LoginPage;

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = getObjectFromFormData(await request.formData()) as UserLoginData;

    try {
        const { jwt, user: { id } } = await AuthService.login(data);

        login(jwt, id);

        return redirect('/');
    } catch (err) {
        return { errStatus: (err as AxiosError).response!.status };
    }
};
