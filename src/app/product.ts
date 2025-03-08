export class Product {
  _id: number = -1;
  product_name!: string;
  product_description?: string;
  product_price!: number;
  product_stockQuantity: number = 0;
  product_images: String[] = [];
  categoryID!: string;
  discountID?: string;
  original_price: number = 0;
  discount_price: number = 0;
  average_rating: number = 0;
  total_ratings: number = 0;
  stars:[]=[];
  product_created_at?: Date;
  product_updated_at?: Date;
}
