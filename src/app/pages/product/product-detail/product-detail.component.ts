import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GraphqlService, Product} from '@app/core/graphql/graphql.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(
        private graphqlService: GraphqlService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        const productId = parseInt(this.route.snapshot.paramMap.get('id'), 0);
        this.graphqlService.getProductById(productId).subscribe(value => {
            this.product = value;
            console.log(value);
        }, error => {
            alert(error);
        });
    }
}
