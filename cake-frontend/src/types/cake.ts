export interface Cake {

    _id?: string;
    // id: number;
    name: string;
    comment: string;
    imageUrl: string;
    yumFactor: number;
  }
  
  export interface CakeFormData {
    _id?: string;
    name: string;
    comment: string;
    imageUrl: string;
    yumFactor: number;
  }
  
  export type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
  };