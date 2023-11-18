import { APP_INITIALIZER, ApplicationConfig, ApplicationRef, Injector, importProvidersFrom, isDevMode } from '@angular/core';
import { AppService, initProviderFactory } from './app.service';

class AppRef {
  private appRef!: ApplicationRef;
  get instance(): ApplicationRef {
    if(!this.appRef) {
      this.appRef = core.injector.get(ApplicationRef);
    }
    return this.appRef;
  }
}

export const appRef = new AppRef();

export function injectors() {
  return {
    environmentInjector: appRef.instance.injector,
    elementInjector: core.injector
  };
}

export const core = { } as {
  injector: Injector,
};

const appInitializer = {
  provide: APP_INITIALIZER,
  useFactory: initProviderFactory,
  deps: [AppService],
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    AppService,
    appInitializer,
]};




