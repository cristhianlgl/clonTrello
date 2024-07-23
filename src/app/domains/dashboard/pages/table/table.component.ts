import { Product } from '@/models/product.model';
import { ProductService } from '@/services/product.service';
import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NavbarComponent, CdkTableModule],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  productService = inject(ProductService);
  products = signal<Product[]>([]);
  columns: string[] = ['cover', '#No', 'Name', 'price'];


  ngOnInit(): void {
    this.productService.getProduct().subscribe({
      next: (data) => this.products.set(data)
    })
  }

}
