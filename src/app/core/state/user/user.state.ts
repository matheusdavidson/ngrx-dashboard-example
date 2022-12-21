import { User as Auth0User } from '@auth0/auth0-spa-js';

export interface UserState {
    userDetails: Auth0User;
}

export const initialState: UserState = {
    userDetails: Auth0User,
};
