import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './shared';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './core';
import { MenusEffects } from './core/state/menus';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule.forRoot({
            ...environment.auth,
            httpInterceptor: {
                allowedList: [`${environment.serverUrl}/api/menu/items`, `${environment.serverUrl}/api/menu/items/*`],
            },
        }),
        AppRoutingModule,
        NavBarModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([MenusEffects]),
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
    ],
})
export class AppModule {}
