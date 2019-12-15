import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './pages/home/home.module';
import { ShellModule } from './pages/_template/shell.module';
import { AboutModule } from './pages/about/about.module';
import { LoginModule } from './pages/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';
import { ProductMasterComponent } from './pages/product/product-master/product-master.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductRoutingModule } from '@app/pages/product/product-routing.module';
import { PriceListComponent } from './pages/priceList/price-list/price-list.component';
import {PriceListRoutingModule} from '@app/pages/priceList/pricelist-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    LoginModule,
    ProductRoutingModule,
    PriceListRoutingModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, ProductMasterComponent, ProductDetailComponent, PriceListComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
