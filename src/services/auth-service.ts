import api from '../api';
import AuthResponse from '../models/auth-response';
import UserRegistrationData from '../models/user-registration-data';
import UserLoginData from '../models/user-login-data';
import UserResetPassData from '../models/user-reset-pass-data';
import ApiUrlsConstants from '../constants/api-urls';

class AuthService {
    static async register(userData: UserRegistrationData): Promise<AuthResponse> {
        return (await api.post(ApiUrlsConstants.REGISTER, userData)).data;
    }

    static async login(userData: UserLoginData): Promise<AuthResponse> {
        return (await api.post(ApiUrlsConstants.LOGIN, userData)).data;
    }

    static async forgotPassword(userData: { email: string }): Promise<{ ok: true }> {
        return (await api.post(ApiUrlsConstants.FORGOT_PASSWORD, userData)).data;
    }

    static async resetPassword(userData: UserResetPassData): Promise<AuthResponse> {
        return (await api.post(ApiUrlsConstants.RESET_PASSWORD, userData)).data;
    }
}

export default AuthService;
