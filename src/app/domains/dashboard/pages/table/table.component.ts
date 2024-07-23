import { Product } from '@/models/product.model';
import { ProductService } from '@/services/product.service';
import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';
import { Component, inject, signal } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NavbarComponent, CdkTableModule, NgClass],
  templateUrl: './table.component.html'
})
export class TableComponent {

  productService = inject(ProductService);
  products = signal<Product[]>([]);
  total = signal(0)
  columns: string[] = ['cover', '#No', 'Name', 'price'];


  ngOnInit(): void {
    this.productService.getProduct().subscribe({
      next: (data) => {
        this.products.set(data)
        let totals =0
        this.total.set(this.products().reduce((acumulador, product) => acumulador + product.price, 0))
      }
    })
  }

}
