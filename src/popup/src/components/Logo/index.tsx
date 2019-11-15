import React from "react";
import { Image } from "react-bootstrap";

import LogoSrc from '../../assets/logo.png';
import styles from './index.module.scss';

export default () => <Image src={LogoSrc} alt="Nils" className={ styles.logo } />;