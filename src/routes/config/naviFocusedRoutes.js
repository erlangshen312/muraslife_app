import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export function getTabBarVisible(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'Details':
      return false;
    case 'Find':
      return false;
    case 'Create':
      return false;
    case 'Auth':
      return false;
    case 'Sign in':
      return false;
    default:
      true;
  }
}
