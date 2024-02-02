import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { product } from '../../models/product-interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productForm!: FormGroup;
  id: number = 0;
  productListData: product[] = [];
  imageUrl: string = '';
  storedImgUrl: string = '';
  sortedData: product[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.sortedData = this.productListData.slice();
  }

  ngOnInit(): void {
    this.setProductLstForm();
    this.getListDataFormLocal();
  }

  setProductLstForm() {
    this.productForm = this.formBuilder.group({
      productImg: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      details: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
    });
  }

  onSubmitProductListForm() {
    if (this.productForm.valid) {
      let listData: product = {
        id: ++this.id,
        productImg: this.imageUrl,
        productName: this.productForm.value.productName,
        details: this.productForm.value.details,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        totalPrice: this.productForm.value.totalPrice,
        createdDate: this.productForm.value.createdDate,
      };
      this.actionsAfterSubmit(listData);
    }
  }

  actionsAfterSubmit(listData: product) {
    this.productForm.reset();
    this.setListDataInLocal(listData);
    this.getListDataFormLocal();
  }

  setListDataInLocal(Data: any): void {
    this.setDataInLocalStorage(Data.id.toString(), JSON.stringify(Data));
  }

  setDataInLocalStorage(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  getListDataFormLocal(): void {
    let keys = Object.keys(localStorage);
    let listArray: any = [];
    for (let i = 0; i < keys.length; i++) {
      let value = localStorage.getItem(keys[i]);
      listArray.push(value);
      this.productListData = listArray.map(JSON.parse);
    }
    this.sortedData = this.productListData.slice();
  }

  RemoveProduct(userId: number = 0) {
    this.deleteUserDataFromLocal(userId);
    this.removeObjectWithId(this.productListData, userId);
    this.getListDataFormLocal();
  }

  removeObjectWithId(data: product[], id: number) {
    const objWithIdIndex = data.findIndex((obj: any) => obj.id === id);

    if (objWithIdIndex > -1) {
      this.productListData.splice(objWithIdIndex, 1);
    }
  }

  deleteUserDataFromLocal(userId: number) {
    this.removeDataFromLocalStorage(userId.toString());
  }
  private removeDataFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  sortData(sort: Sort) {
    const data = this.productListData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'productImg':
          return this.compare(a.productImg, b.productImg, isAsc);
        case 'productName':
          return this.compare(a.productName, b.productName, isAsc);
        case 'details':
          return this.compare(a.details, b.details, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'totalPrice':
          return this.compare(a.totalPrice, b.totalPrice, isAsc);
        case 'createdDate':
          return this.compare(a.createdDate, b.createdDate, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
