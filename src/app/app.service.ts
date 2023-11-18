import { Injectable, Injector } from '@angular/core';
import { core } from './app.utils';

export function initProviderFactory(security: AppService): () => void {
  return () => security.initializer();
}

@Injectable()
export class AppService {

  constructor(
    private injector: Injector
  ) {}

  async initializer(): Promise<void> {
    core.injector = this.injector;
  }
}
