import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'app/product.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Product } from '../../models/product';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products:Product[];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'actions'];
  listData: MatTableDataSource<Product>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;  
  pageSize = 10; 

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll2().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]){
    this.listData = new MatTableDataSource(products);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }

  filter(query: string){
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
      this.products;

    this.initializeTable(filteredProducts);
  }
  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public handlePage(e: any) {
    this.pageSize = e.pageSize;
  }
}
