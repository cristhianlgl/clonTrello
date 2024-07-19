import { NavbarComponent } from '@/shared/componets/navbar/navbar.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductService } from '@/services/product.service';
import { Product } from '@/models/product.model';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [NavbarComponent, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll.component.html'
})
export class ScrollComponent {
  productServices = inject(ProductService);
  products: Product[] = []

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.productServices.getProduct().subscribe({
      next: (data) => {
        this.products.push(...data);
      },
      complete:() => this.cdr.markForCheck()
    })    
  }
}
