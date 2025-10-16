import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptor/auth-interceptor';
import 'zone.js'; 
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
}).catch((err) => console.error(err));
