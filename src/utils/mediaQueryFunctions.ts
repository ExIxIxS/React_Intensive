import { MOBILE_WIDTH } from 'src/constants/mediaQuery.constants';

import { MediaQuery, Resolution } from 'src/interfaces/store.inrerfaces';

function getCurrentResolution(): Resolution {
  return {
    width: window.innerWidth,
    heigth: window.innerHeight,
  };
}

function getCurrentMediaQuery(): MediaQuery {
  const resolution = getCurrentResolution();

  return {
    deviceType: resolution.width > MOBILE_WIDTH ? 'desktop' : 'mobile',
    resolution: resolution,
  };
}

export { getCurrentResolution, getCurrentMediaQuery };
