import { Component } from '@angular/core';

@Component({
  selector: 'mi-looks',
  templateUrl: './looks.component.html',
  styleUrl: './looks.component.css'
})
export class LooksComponent {
  products: any[] = [
    'assets/images/products/image-1.png',
    'assets/images/products/image-2.png',
    'assets/images/products/image-3.png',
    'assets/images/products/image-4.png',
    'assets/images/products/image-1.png',
    'assets/images/products/image-2.png',
    'assets/images/products/image-3.png',
    'assets/images/products/image-4.png',
  ];
}
