import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenusStateService, RolesService } from 'src/app/core';
import { selectMenuItems } from 'src/app/core/state/menus';
import { selectIsAdmin } from 'src/app/core/state/user';

@Component({
    selector: 'app-menu-items',
    templateUrl: './menu-items.component.html',
    styles: [
        `
            :host {
                width: 100%;
                height: 100%;
            }
        `,
    ],
})
export class MenuItemsComponent {
    // menuItems$ = this.menusStateService.selectMenuItems$();
    menuItems$ = this.store.select(selectMenuItems);
    // isAdmin$ = this.rolesService.isAdmin$;
    isAdmin$ = this.store.select(selectIsAdmin);

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private menusStateService: MenusStateService, private rolesService: RolesService, private store: Store) {
        this.menusStateService.fetchMenuItems();
    }

    addMenuItem(): void {
        this.router.navigate(['add'], { relativeTo: this.activatedRoute });
    }
}
