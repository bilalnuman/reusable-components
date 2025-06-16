export interface ProductType {
  id: number;
  owner: number;
  quantity: number;
  product_id: string;
  model_name: string;
  date_purchased: string; // ISO date string (e.g. "2024-11-18")
  date_sold: string | null;
  hold_time: number;
  source_of_sale: string;
  brand: string;
  category: number;
  buying_price: string;
  sold_price: string;
  wholesale_price: string;
  profit: number;
  profit_margin: number;
  shipping_price: string;
  repair_cost: string;
  fees: string;
  commission: string;
  msrp: string;
  website_price: string;
  purchased_from: string;
  sold_source: string;
  listed_on: string;
  image: string;
  is_sold: boolean;
  availability: 'available' | 'in_repair' | 'sold' | string; // adapt if values are known
  condition: 'new' | 'used' | string; // adapt if values are known
  serial_number: string;
  year: number;
}
