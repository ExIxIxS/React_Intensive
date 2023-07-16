import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import DropDownMenu from 'src/components/shared/dropDownMenu';

import { DropDownMenuPropsItem } from 'src/components/shared/dropDownMenu/dropDownMenu.interfaces';

const unauthorizedMenuItemsData = {
  login: { id: uuid(), title: 'Login' },
  signUp: { id: uuid(), title: 'Sign up' },
};

const uthorizedMenuItemsData = {
  logOut: { id: uuid(), title: 'Log out' },
};

function AuthMenu(): JSX.Element {
  const [isUthorized, setIsUthorized] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<DropDownMenuPropsItem[]>([]);

  const unauthorizedMenuItems: DropDownMenuPropsItem[] = [
    { ...unauthorizedMenuItemsData.login, clickHandler: () => setIsUthorized(true) },
    { ...unauthorizedMenuItemsData.signUp, clickHandler: () => setIsUthorized(true) },
  ];

  const uthorizedMenuItems: DropDownMenuPropsItem[] = [
    { ...uthorizedMenuItemsData.logOut, clickHandler: () => setIsUthorized(false) },
  ];

  useEffect(() => {
    const newMenuItems = isUthorized ? uthorizedMenuItems : unauthorizedMenuItems;
    setMenuItems(newMenuItems);
  }, [isUthorized]);

  return (
    <DropDownMenu menuItems={menuItems} position="right" iconSrc="src/assets/icons/user.png" />
  );
}

export default AuthMenu;
