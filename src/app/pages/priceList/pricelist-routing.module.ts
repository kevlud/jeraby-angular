import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/pages/_template/shell.service';
import { ProductMasterComponent } from '@app/pages/product/product-master/product-master.component';
import { ProductDetailComponent } from '@app/pages/product/product-detail/product-detail.component';
import {PriceListComponent} from '@app/pages/priceList/price-list/price-list.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'priceList',
      component: PriceListComponent,
      data: { title: extract('Price Lists') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PriceListRoutingModule {}
