import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { connectReduxDevtools } from '@reatom/debug';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgReatom, NgReatomModule } from './lib';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgReatomModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
    constructor(ngReatom: NgReatom) {
        ngReatom.createStore();

        const unsubscribeDevTools = connectReduxDevtools(ngReatom, {});
    }
}
