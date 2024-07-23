import { Product } from "@/models/product.model";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export class ProductDataSource extends DataSource<Product> {
 
    data = new BehaviorSubject<Product[]>([]);
  
    init(products: Product[]){
        this.data.next(products)
    }

    connect(): Observable<Product[]> {
      return this.data;
    }
  
    disconnect() {}

    getTotal(){
       return this.data.getValue().reduce((total, product) => total + product.price, 0)
    }
    updateProduct(id: Product['id'], change: Partial<Product>){
        const products = this.data.getValue();
        const index = products.findIndex(product => product.id === id);
        if(index < 0)
            return;

        products[index] = {
            ...products[index],
            ...change
        };
        
        this.data.next(products);
    }
  }