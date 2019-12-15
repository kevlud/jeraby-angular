import {Component, OnInit} from '@angular/core';
import {GraphqlService, PriceList} from '@app/core/graphql/graphql.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-price-list',
    templateUrl: './price-list.component.html',
    styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

    public priceList: PriceList;
    fileToUpload: File = null;


    constructor(private graphqlService: GraphqlService, private router: Router) {
    }

    ngOnInit() {
        this.graphqlService.getLastPriceList().subscribe(value => {
            this.priceList = value;
            console.log(value);
        }, error => {
            alert(error);
        });
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    buttonUploadFile() {
        this.priceList = null;

        this.graphqlService.postFile(this.fileToUpload).subscribe(data => {
            console.log(data);
            this.graphqlService.mutateImportPriceList(data.filePath).subscribe(response => {
                location.reload();
            }, error => {
                alert(error);
            });

        }, error => {
            alert(error);
        });
    }

}
