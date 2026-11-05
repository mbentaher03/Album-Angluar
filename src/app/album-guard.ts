import { CanActivateFn } from '@angular/router';

export const albumGuard: CanActivateFn = (route, state) => {
  return true;
};
