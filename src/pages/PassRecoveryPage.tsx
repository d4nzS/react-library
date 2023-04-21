import { FC } from 'react';
import { ActionFunctionArgs } from 'react-router-dom';

import PassRecovery from '../components/Auth/PassRecovery/PassRecovery';
import getObjectFromFormData from '../utils/get-object-from-form-data';
import UserResetPassData from '../models/user-reset-pass-data';
import AuthService from '../services/auth-service';

const PassRecoveryPage: FC = () => {
    return <PassRecovery/>;
};

export default PassRecoveryPage;

export const forgotPassAction = async  ({ request }: ActionFunctionArgs) => {
    const { searchParams } = new URL(request.url);
    const recoveryCode = searchParams.get('code');
    let isSucceed = true;

    try {
        if (recoveryCode) {
            const data = {
                ...getObjectFromFormData(await request.formData()),
                code: recoveryCode
            } as UserResetPassData;

            await AuthService.resetPassword(data);
        } else {
            const data = getObjectFromFormData(await request.formData()) as { email: string };

            await AuthService.forgotPassword(data);
        }
    } catch {
        isSucceed = false
    }

    return { isSucceed };
};
