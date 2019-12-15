import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgReatom, NgReatomModule } from './lib';
import { HttpClientModule } from '@angular/common/http';

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
    }
}
