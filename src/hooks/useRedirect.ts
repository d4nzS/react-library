import { useNavigate } from 'react-router-dom';

const useRedirect = () => {
    const navigate = useNavigate();

    return () => navigate('', { state: { pageWasReload: true } });
};

export default useRedirect;
