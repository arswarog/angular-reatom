import { Atom } from '@reatom/core';
import { InjectionToken, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgReatom, RootAtom } from './reatom.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [],
})
export class NgReatomModule {
    static forRoot(rootAtom?: Atom<any> | Atom<any>[]): ModuleWithProviders {
        return {
            ngModule: NgReatomModule,
            providers: [
                NgReatom,
                {provide: RootAtom, useValue: rootAtom},
            ],
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: NgReatomModule,
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: NgReatomModule) {
        // if (parentModule) {
        //     throw new Error('NgReatomModule is already loaded. Import it in the AppModule only');
        // }
    }
}
