import Navbar from 'src/components/shared/navbar';
import { getNavDataItems } from 'src/utils/navigationFunctions';

function Header(): JSX.Element {
  return (
    <header className="header">
      <Navbar navData={getNavDataItems()} />
    </header>
  );
}

export default Header;
