import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Output() close = new EventEmitter<void>(); // Event emitter for the cancel button
  @Input() product!: Product; // Input property to receive the selected product
  @Output() submit = new EventEmitter<Product>(); // Emit when the form is submitted
 // @Output() close = new EventEmitter<void>(); // Emit to close the form
  productForm: FormGroup;
  private apiUrl = 'http://localhost:3000/products'; // JSON Server URL

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.productForm = this.formBuilder.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  onSubmitProductListForm() {
    if (this.productForm.valid) {
      const listData: Product = {
        id: Date.now(), // Generate a unique ID
        assignedTo: this.productForm.value.assignedTo,
        status: this.productForm.value.status,
        dueDate: this.productForm.value.dueDate,
        priority: this.productForm.value.priority,
        comments: this.productForm.value.comments,
        createdDate: new Date().toISOString(),
      };

      this.productService.addProduct(listData).subscribe({
        next: () => {
          this.productForm.reset(); // Reset the form here after successful submission
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }
}
