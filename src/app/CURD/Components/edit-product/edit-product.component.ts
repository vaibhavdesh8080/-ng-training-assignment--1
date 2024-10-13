import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  @Input() product!: Product; // Input product to edit
  @Output() update = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {
    if (this.product) {
      this.editForm.patchValue(this.product); // Pre-fill the form with product data
    }
  }

  createForm() {
    this.editForm = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      comments: ['']
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.update.emit({ ...this.product, ...this.editForm.value }); // Emit updated product
    }
  }

  onCancel() {
    this.cancel.emit(); // Emit cancel event
  }
}
