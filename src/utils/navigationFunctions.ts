import { appNavPaths } from 'src/constants/navPaths.constants';
import { NavData, NavInitDataItem } from 'src/components/shared/navbar/navbar.interfaces';
import { addIdToObject } from './componentsFunctions';

function getNavDataItems(): NavData {
  const idNavPaths = appNavPaths.map((navDataItem) => addIdToObject<NavInitDataItem>(navDataItem));
  const frozendNavData = Object.freeze(idNavPaths);

  return frozendNavData;
}

export { getNavDataItems };
