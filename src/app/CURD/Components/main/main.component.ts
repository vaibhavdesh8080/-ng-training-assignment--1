// src/app/components/main/main.component.ts
import { Component } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  selectedProduct: Product | null = null;
  isEditModalOpen = false;

  openEditModal(product: Product): void {
    this.selectedProduct = { ...product };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.selectedProduct = null;
    this.isEditModalOpen = false;
  }
}
