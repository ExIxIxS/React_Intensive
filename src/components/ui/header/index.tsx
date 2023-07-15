import Navbar from 'src/components/shared/navbar';
import { getNavDataItems } from 'src/utils/navigationFunctions';

import styles from 'src/components/ui/header/header.module.scss';
import AppLogo from '../appLogo';

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <AppLogo />
      <Navbar navData={getNavDataItems()} />
    </header>
  );
}

export default Header;
