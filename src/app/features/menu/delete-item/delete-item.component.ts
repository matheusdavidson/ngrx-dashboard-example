import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MenusStateService } from 'src/app/core';
import { Store } from '@ngrx/store';
import { deleteMenuItemInitiated, selectMenuItem } from 'src/app/core/state/menus';

@Component({
    selector: 'app-delete-item',
    templateUrl: './delete-item.component.html',
    styleUrls: ['./delete-item.component.scss'],
})
export class DeleteItemComponent {
    menuItemId$ = this.activatedRoute.params.pipe(map((params) => params.id));
    // menuItem$ = this.menuItemId$.pipe(switchMap((id) => this.menusStateService.selectMenuItem$(id)));
    menuItem$ = this.menuItemId$.pipe(switchMap((id) => this.store.select(selectMenuItem({ id: id }))));

    constructor(private activatedRoute: ActivatedRoute, private location: Location, private router: Router, private menusStateService: MenusStateService, private store: Store) {
        // TODO: this is a workaround, once the API is wired up
        // we will need a way to emit latest from state service
        this.menusStateService.fetchMenuItems();
    }

    // deleteMenuItem(id: string): void {
    //     this.menusStateService.deleteMenuItem(id);
    //     this.navigateHome();
    // }

    deleteMenuItem(id: string): void {
        this.store.dispatch(deleteMenuItemInitiated({ menuId: id }));
    }

    cancel(): void {
        this.back();
    }

    back(): void {
        this.location.back();
    }

    navigateHome(): void {
        this.router.navigate(['/menu']);
    }
}
