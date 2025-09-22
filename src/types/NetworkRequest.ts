export interface Book {
  title: string;
  author: string;
  rating?: number;
}

export type NetworkRequestState = 
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'success'; data: Book[] };