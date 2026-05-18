import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { OmdbApiService } from './app/omdb-api.service';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        importProvidersFrom(BrowserModule),
        OmdbApiService
    ]
}).catch(e => console.error(e));

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
