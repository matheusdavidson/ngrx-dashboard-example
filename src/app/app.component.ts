import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { appLoaded } from './core/state/menus';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'spa-angular-typescript-dashboard';

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.dispatch(appLoaded());
    }
}
