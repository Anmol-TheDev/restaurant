const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = "ApiError"
  }
}

type orderParams = {
  status?:
    | "pending"
    | "paid"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  page?: number;
  limit?: number;
  expand?: boolean
};

export type order = {
     
    created_at: string;
    currency: string;
    customer_id: string;
    discount: number;
    id: number;
    shipping_method: string;
    status: string;
    subtotal: number;
    tax: number;
    total: number;
    customer:{
        id: number;
        name:string;
        phone:number;
    }
  
}

export type orderRes = {
  data:order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export async function GetOrders(params: orderParams):Promise<orderRes>  {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if(params.expand) query.set("expand","customer")
  const response = await fetch(`${baseUrl}/orders?${query}`);
  if (!response.ok) {
    throw new ApiError(response.status, `Error while fetching orders: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
