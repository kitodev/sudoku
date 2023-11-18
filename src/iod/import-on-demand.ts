import { ApplicationRef, ComponentRef, EmbeddedViewRef, Type, createComponent } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { core, injectors } from '../app/app.utils';
import { Cell } from '../app/board/cell/cell.model';

export interface DynamicImportingFunctions {
  whenSelect: Subject<Cell | null>;
  setData<T>(config: T): void;
}

class AppRef {
  private appRef!: ApplicationRef;
  get instance(): ApplicationRef {
    if(!this.appRef) {
      this.appRef = core.injector.get(ApplicationRef);
    }
    return this.appRef;
  }
}
const appRef = new AppRef();

class ImportOnDemand {

  async openKeyboard(): Promise<ComponentRef<DynamicImportingFunctions>> {
    // Now you can load any component you wan on demand
    const { KeyboardComponent } = await import('./keyboard/keyboard.component');;
    return this.open(KeyboardComponent);
  }

  async destroy(dialog: ComponentRef<DynamicImportingFunctions>, sub: Subscription, timeout = 700): Promise<void> {
    sub.unsubscribe();
    dialog.hostView.destroy();
    appRef.instance.detachView(dialog.hostView);
  }

  // Now you can add any component dynamically
  private open<T>(cmpt: Type<T>): ComponentRef<T> {
    const cmptRef = createComponent(cmpt, injectors());
    appRef.instance.attachView(cmptRef.hostView);
    window.document.body.appendChild((cmptRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    return cmptRef;
  }

}

export const iod = new ImportOnDemand();

