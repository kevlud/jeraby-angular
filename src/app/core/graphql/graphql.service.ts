import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {createHttpLink} from 'apollo-link-http';
import ApolloClient from 'apollo-client';

export interface Permission {
    id: number;
    name: string;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    currentToken: string;
    permissions: Permission[];
}

export interface Product {
    id?: number;
    name: string;
    model: string;
    buyer: string;
    sellPrice: number;
    manufacturePrice: number;
    weight: number;
    assemblyLists: AssemblyList[];
}

export interface AssemblyList {

    id?: number;

    name?: string;

    createdAt: Date;

    updatedAt: Date;

    product: Product;

    parts: Part[];


    weight: number;
    manufacturePrice: number;
}

export interface Part {
    id?: number;
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    thickness?: number;
    price: number;
    material: Material;
    createdAt: Date;
    updatedAt: Date;
}

export interface Material {
    id: number;
    type: string
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    thickness?: number;
}

export interface PriceList {
    creator: User;

    importDate: Date;

    description: string;

    priceItems: PriceItem[];

    createdAt: Date;

    updatedAt: Date;

}


export interface PriceItem {

    id?: number;

    pricePerMeter: number;

    pricePerKilo: number;

    priceList: PriceList;

    materialId: number;

    material: Material;

}


@Injectable({
    providedIn: 'root'
})
export class GraphqlService {
    constructor(private apollo: Apollo, httpLink: HttpLink, private httpClient: HttpClient) {

        /*
                apollo.create({
                    link: httpLink.create({uri: 'http://localhost:4001/graphql'}),
                    cache: new InMemoryCache(),
                });
        */

        const link = createHttpLink({
            uri: 'http://localhost:4001/graphql',
            credentials: 'include'
        });

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link,
        });

        apollo.setClient(client);
    }

    public login(emailArg: string, passwordArg: string) {
        return this.apollo
        .mutate({
            mutation: gql`
                mutation($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        id
                        email
                        firstName
                        lastName
                        currentToken
                        permissions {
                            id
                            name
                        }
                    }
                }
            `,
            variables: {email: emailArg, password: passwordArg}
        })
        .pipe(map(result => result.data['login'])) as Observable<User>;
    }

    public getProductById(id: number) {
        return this.apollo
        .query({
            query: gql`
                query($id: ID!) {
                    getProduct(id: $id) {
                        id
                        name
                        model
                        buyer
                        sellPrice
                        manufacturePrice
                        assemblyLists{
                            id
                            name
                            manufacturePrice
                            parts {
                                id
                                height
                                width
                                length
                                thickness
                                price
                                material {
                                    type
                                }
                            }
                        }

                    }
                }
            `,
            variables: {id: id}
        })
        .pipe(map(result => result.data['getProduct'])) as Observable<Product>;
    }

    public getAllProducts() {
        return this.apollo
        .query({
            query: gql`
                query getAllProducts {
                    getProducts {
                        id
                        name
                        model
                        buyer
                        sellPrice
                        manufacturePrice
                        weight
                    }
                }
            `
        })
        .pipe(map(result => result.data['getProducts'])) as Observable<Product[]>;
    }

    public mutateExportFinalPrices() {
        return this.apollo
        .mutate({
            mutation: gql`
                mutation {
                    exportProductPrices
                }
            `
        })
        .pipe(map(result => result.data['exportProductPrices'])) as Observable<string>;
    }


    public mutateImportPriceList(fileName: string) {
        return this.apollo
        .mutate({
                mutation: gql`
                    mutation ($filename: String! ) {
                        parsePriceListXLSX(filename: $filename)
                    }
                `,
                variables: {
                    filename: fileName,
                },
            }
        )
        .pipe(map(result => result.data['parsePriceListXLSX'])) as Observable<string>;
    }

    public getLastPriceList() {
        return this.apollo
        .query({
            query: gql`
                query getPriceList {
                    getPriceList {
                        id
                        description
                        importDate
                        creator{email}
                        priceItems {
                            id
                            material {
                                id
                                type
                                thickness
                                width
                                height
                                length
                            }
                            pricePerKilo
                            pricePerMeter
                        }
                    }
                }
            `
        })
        .pipe(map(result => result.data['getPriceList'])) as Observable<PriceList>;
    }


    public mutateImportAssemblyList(fileName: string) {
        return this.apollo
        .mutate({
                mutation: gql`
                    mutation ($filename: String! ) {
                        parseAssemblyListXLSX(filename: $filename)
                    }
                `,
                variables: {
                    filename: fileName,
                },
            }
        )
        .pipe(map(result => result.data['parseAssemblyListXLSX'])) as Observable<string>;
    }


    postFile(fileToUpload: File): Observable<any> {
        const endpoint = 'http://localhost:4001/uploadFile';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient
            .post(endpoint, formData, {}) as Observable<any>;
    }

}
