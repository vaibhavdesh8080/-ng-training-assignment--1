export interface Product {
  id: number;
  assignedTo: string;
  status: string;
  dueDate: string; // Change to 'Date' if you prefer
  priority: string;
  comments: string;
  createdDate: string;
}
