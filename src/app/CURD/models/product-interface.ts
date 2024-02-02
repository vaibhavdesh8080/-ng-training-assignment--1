export interface productList {
  product: product[];
}

export interface product {
  id?: number;
  productImg: string;
  productName: string;
  details: string;
  price: number;
  quantity: number;
  totalPrice: number;
  createdDate: Date;
}
