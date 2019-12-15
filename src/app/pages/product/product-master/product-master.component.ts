import {Component, OnInit} from '@angular/core';
import {GraphqlService, Product} from '@app/core/graphql/graphql.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-product-master',
    templateUrl: './product-master.component.html',
    styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {
    products: Product[];

    exportedProductPricesLink: undefined | string = undefined;


    fileToUpload: File = null;

    constructor(private graphqlService: GraphqlService, private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.graphqlService.getAllProducts().subscribe(value => {
            this.products = value;
            console.log(value);
        }, error => {
            alert(error);
        });
    }

    exportFinalPrices() {
        this.graphqlService.mutateExportFinalPrices().subscribe(value => {

            this.exportedProductPricesLink = value;
        }, error => {
            alert(error);
        });

    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    buttonUploadFile() {
        this.products = null;

        this.graphqlService.postFile(this.fileToUpload).subscribe(data => {
            console.log(data);
            this.graphqlService.mutateImportAssemblyList(data.filePath).subscribe(response => {
                location.reload();
            }, error => {
                alert(error);
            });

        }, error => {
            alert(error);
        });
    }
}
