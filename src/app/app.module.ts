import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeUk from '@angular/common/locales/uk';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { InterceptorService } from './services/interceptor-service.service';
import { Translate_Service } from './services/translate.service';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { IndexComponent } from './views/index/index.component';
import { PlayerComponent } from './views/players/player/player.component';
import { GrouptestDashboardComponent } from './views/grouptest/grouptest-dashboard/grouptest-dashboard.component';
import { ListGrouptestComponent } from './views/grouptest/list-grouptest/list-grouptest.component';

registerLocaleData(localeUk);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    PlayerComponent,
    GrouptestDashboardComponent,
    ListGrouptestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    Translate_Service,
    ApiService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true 
    },
    {provide: LOCALE_ID, useValue: 'uk'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
