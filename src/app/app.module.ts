import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { connectReduxDevtools } from '@reatom/debug';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgReatom, NgReatomModule } from '@reatom/angular';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgReatomModule.forRoot(),
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
    constructor(ngReatom: NgReatom) {
        const unsubscribeDevTools = connectReduxDevtools(ngReatom.store, {});
    }
}
