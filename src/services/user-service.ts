import api from '../api';
import User from '../models/user';
import UserEditData from '../models/user-edit-data';
import ApiUrlsConstants from '../constants/api-urls';
import { getCurrentUserId } from '../utils/auth';

class UserService {
    static async getCurrentUser(): Promise<User> {
        return (await api.get(`${ApiUrlsConstants.USER}/me`)).data;
    }

    static async uploadAvatar(file: FormData): Promise<{ id: string }> {
        return (await api.post(ApiUrlsConstants.UPLOAD_AVATAR, file)).data[0];
    }

    static async changeAvatar(loadedImgId: string): Promise<void> {
        return api.put(`${ApiUrlsConstants.USER}/${getCurrentUserId()}`, { avatar: loadedImgId });
    }

    static async editCredentials(userData: UserEditData): Promise<void> {
        return api.put(`${ApiUrlsConstants.USER}/${getCurrentUserId()}`)
    }
}

export default UserService;
