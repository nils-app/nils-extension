import React from "react";

import styles from './index.module.scss';
import { WEB_URL, API_URL } from "../../constants";

export default () => {
  return (
    <div className={ styles.footer }>
      &copy; Nils <a href={ `${WEB_URL}/dashboard` }>Top Up</a> <a href={ `${WEB_URL}` }>About Nils</a> <a href={ `${API_URL}/users/logout` }>Sign Out</a>
    </div>
  );
}