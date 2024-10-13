import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productListData: Product[] = [];
  sortedData: Product[] = [];
  selectedProduct: Product = this.createEmptyProduct();
  isEditModalOpen = false;
  isDeleteModalOpen = false; // Flag for delete modal visibility

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsFromServer();
  }

  createEmptyProduct(): Product {
    return {
      id: 0,
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
      comments: '',
    } as Product;
  }

  getProductsFromServer(): void {
    this.productService.getProductsFromServer().subscribe(
      (data: Product[]) => {
        this.productListData = data;
        this.sortedData = [...this.productListData];
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching data:', error.message);
      }
    );
  }

  openDeleteModal(product: Product): void {
    this.selectedProduct = product; // Set the selected product for deletion
    this.isDeleteModalOpen = true; // Open the delete modal
  }

  removeProduct(productId: number): void {
    this.productService.removeProductFromServer(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.getProductsFromServer(); // Refresh product list after deletion
        this.isDeleteModalOpen = false; // Close delete modal
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting product:', error.message);
      }
    );
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product; // Set the selected product for editing
    this.isEditModalOpen = true; // Open the edit modal
  }

  editProduct(): void {
    this.productService.updateProduct(this.selectedProduct).subscribe(
      () => {
        console.log('Product updated successfully');
        this.getProductsFromServer(); // Refresh product list after update
        this.isEditModalOpen = false; // Close edit modal
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating product:', error.message);
      }
    );
  }
}
