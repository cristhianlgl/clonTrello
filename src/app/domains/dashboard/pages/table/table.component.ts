import { ProductService } from '@/services/product.service';
import { Component, inject } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';
import { ProductDataSource } from './data-source-products';
import { BtnComponent } from '@/shared/componets/btn/btn.component';
import { Product } from '@/models/product.model';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CdkTableModule, NgClass, BtnComponent, ReactiveFormsModule],
  templateUrl: './table.component.html'
})
export class TableComponent {

  productService = inject(ProductService);
  productsDataSource = new ProductDataSource();
  columns: string[] = ['cover', '#No', 'Name', 'price', 'action'];
  filtroInput = new FormControl('',{
    nonNullable: true
  })

  ngOnInit(): void {
    this.productService.getProduct().subscribe({
      next: (data) => {
        this.productsDataSource.init(data)
      }
    })

    this.filtroInput.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
        this.productsDataSource.filter(value)
    })
  }

  updateProduct(product: Product){
    this.productsDataSource.updateProduct(product.id, {price: 20})
  }

  filterProduct(){
    this.productsDataSource.filter(this.filtroInput.value)
  }

}
