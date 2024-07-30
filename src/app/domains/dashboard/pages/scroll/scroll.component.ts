import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductService } from '@/services/product.service';
import { Product } from '@/models/product.model';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll.component.html'
})
export class ScrollComponent {
  productServices = inject(ProductService);
  products = signal<Product[]>([]);

  ngOnInit() {
    this.productServices.getProduct().subscribe({
      next: (data) => {
        this.products.set(data);
      }
    })    
  }
}
