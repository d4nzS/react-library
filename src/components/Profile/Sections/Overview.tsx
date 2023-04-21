import { ChangeEvent, FC, useRef } from 'react';

import classes from './Overview.module.scss';
import useRedirect from '../../../hooks/useRedirect';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { changeAvatar } from '../../../store/http/actions';
import { HOST_URL } from '../../../api';
import defaultAvatarImg from '../../../assets/images/default-avatar.png';
import { ReactComponent as CameraIcon } from '../../../assets/icons/camera-icon.svg';

interface OverviewProps {
    firstName: string;
    lastName: string;
    avatar?: string;
}

const Overview: FC<OverviewProps> = ({
                                         firstName,
                                         lastName,
                                         avatar
                                     }) => {
    const redirect = useRedirect();
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectAvatarHandler = (): void => {
        fileInputRef.current!.click();
    };

    const changeAvatarHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append('files', event.target.files[0]);
        fileInputRef.current!.value = '';

        dispatch(changeAvatar(formData));
        redirect();
    };

    return (
        <section
            data-test-id="profile-avatar"
            className={classes.overview}
        >
            <div
                className={classes['overview__avatar-container']}
                onClick={selectAvatarHandler}
            >
                <img
                    src={avatar ? `${HOST_URL}${avatar}` : defaultAvatarImg}
                    alt="Avatar"
                    className={classes['overview__avatar']}
                />
                <div className={classes['overview__update-avatar-outer']}>
                    <CameraIcon className={classes.overview__icon}/>
                    <div className={classes['overview__update-avatar-inner']}/>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={changeAvatarHandler}
                />
            </div>
            <div className={classes['overview__full-name']}>
                <span>{lastName}</span>
                <span>{firstName}</span>
            </div>
        </section>
    );
};

export default Overview;
