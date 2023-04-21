import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import ResetPass from './ResetPass/ResetPass';
import ForgotPass from './ForgotPass/ForgotPass';

const PassRecovery: FC = () => {
    const isPassReset = useSearchParams()[0].get('code') !== null;

    return (
       <>
           {isPassReset
               ? <ResetPass/>
               : <ForgotPass/>}
       </>
    );
};

export default PassRecovery;
