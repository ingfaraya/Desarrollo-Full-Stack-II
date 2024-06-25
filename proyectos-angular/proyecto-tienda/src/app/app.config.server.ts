import { mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideServerRendering } from '@angular/platform-server';

export const config = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering()
  ]
});
