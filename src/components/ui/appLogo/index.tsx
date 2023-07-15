import { useNavigate } from 'react-router';
import IconButton from 'src/components/shared/iconButton';

import { IconButtonProps } from 'src/components/shared/iconButton/iconButton.interfaces';

function AppLogo(): JSX.Element {
  const navigate = useNavigate();

  const appLogoProps: IconButtonProps = {
    iconSrc: 'src/assets/icons/react.png',
    alt: 'Logo',
    handleClick: () => {
      navigate('/');
    },
  };

  return <IconButton {...appLogoProps} />;
}

export default AppLogo;
