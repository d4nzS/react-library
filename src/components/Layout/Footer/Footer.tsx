import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './Footer.module.scss';
import SOCIAL_NETWORKS from './constants';

const Footer: FC = () => {
    return (
        <footer className={classes.footer}>
            <small className={classes.footer__copyright}>© 2020-2023 Cleverland.&nbsp;</small>
            <small className={classes.footer__copyright}>Все права защищены.</small>
            <nav className={classes.footer__nav}>
                <ul className={classes.footer__list}>
                    {SOCIAL_NETWORKS.map(({name, icon: Icon}) => (
                        <li key={name}>
                            <Link to={`https://${name}.com`}>
                                <Icon className={classes.footer__icon}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
