import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/pages/_template/shell.service';
import { ProductMasterComponent } from '@app/pages/product/product-master/product-master.component';
import { ProductDetailComponent } from '@app/pages/product/product-detail/product-detail.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'product/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/product', pathMatch: 'full' },
    {
      path: 'product',
      component: ProductMasterComponent,
      data: { title: extract('Products') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule {}
