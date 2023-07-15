import Navbar from 'src/components/shared/navbar';
import AppLogo from '../appLogo';
import AuthMenu from '../authMenu';
import { getNavDataItems } from 'src/utils/navigationFunctions';

import styles from 'src/components/ui/header/header.module.scss';

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <AppLogo />
      <Navbar navData={getNavDataItems()} />
      <AuthMenu />
    </header>
  );
}

export default Header;
