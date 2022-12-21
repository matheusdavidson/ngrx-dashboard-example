import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

export const USER_ROLES = {
    MENU_ADMIN: 'menu-admin',
};

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    roles$ = this.authService.user$.pipe(
        // tap((user)=>console.log(user)),
        // map((user) => user?.[`${environment.auth.audience}/roles`])
        map((user) => ['menu-admin'])
    );
    isAdmin$ = this.roles$.pipe(map((roles) => roles?.includes(USER_ROLES.MENU_ADMIN)));

    constructor(private authService: AuthService) {}
}
