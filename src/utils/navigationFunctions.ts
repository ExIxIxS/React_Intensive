import { appNavPaths } from 'src/constants/navPaths.constants';
import { NavData, NavInitDataItem } from 'src/interfaces/navData.interfaces';
import { addIdToObject } from './componentsFunctions';

function getNavDataItems(): NavData {
  const idNavPaths = appNavPaths.map((navDataItem) => addIdToObject<NavInitDataItem>(navDataItem));
  const frozendNavData = Object.freeze(idNavPaths);

  return frozendNavData;
}

export { getNavDataItems };
