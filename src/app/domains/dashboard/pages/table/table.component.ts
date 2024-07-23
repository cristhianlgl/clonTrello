import { ProductService } from '@/services/product.service';
import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';
import { Component, inject, signal } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';
import { ProductDataSource } from './data-source-products';
import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { Product } from '@/models/product.model';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NavbarComponent, CdkTableModule, NgClass, BtnComponent],
  templateUrl: './table.component.html'
})
export class TableComponent {

  productService = inject(ProductService);
  productsDataSource = new ProductDataSource();
  columns: string[] = ['cover', '#No', 'Name', 'price', 'action'];


  ngOnInit(): void {
    this.productService.getProduct().subscribe({
      next: (data) => {
        this.productsDataSource.init(data)
      }
    })
  }

  updateProduct(product: Product){
    this.productsDataSource.updateProduct(product.id, {price: 20})
  }

}
