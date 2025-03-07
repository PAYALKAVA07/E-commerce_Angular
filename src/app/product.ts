// export class Product {
//     id:number=-1;
//     product_name:String='';
//     product_description: String='';
//     product_price: number=-1;
//     product_stockQuantity:number=0;
//     product_images:[]=[];
//     categoryID:String='';
//     discountID:String='';
//     total_ratings?: number;
// }

export class Product {
    // You can change "id" to "_id" if your backend uses that field.
    id: number = -1;
    product_name: string = '';
    product_description: string = '';
    product_price: number = 0;
    product_stockQuantity: number = 0;
    // Here product_images is an array of strings (URLs)
    product_images: string[] = [];
    categoryID: string = '';
    discountID: string = '';
    total_ratings?: number;
  }
  