import { NextRequest, NextResponse } from "next/server";
import { Order, OrderResponse } from "@/src/lib/types";

export async function POST(request: NextRequest): Promise<NextResponse<OrderResponse>> {
  try {
    const orderData: Order = await request.json();
    
    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!orderData.table || orderData.table < 1 || orderData.table > 20) {
      return NextResponse.json(
        { success: false, message: "Invalid table number" },
        { status: 400 }
      );
    }

    if (!orderData.whatsappNumber || !/^08\d{8,12}$/.test(orderData.whatsappNumber.trim())) {
      return NextResponse.json(
        { success: false, message: "Invalid WhatsApp number" },
        { status: 400 }
      );
    }

    // Calculate total to verify
    const calculatedTotal = orderData.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Log order (for demo purposes - remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Order received:", {
        table: orderData.table,
        whatsapp: orderData.whatsappNumber,
        totalPrice: orderData.totalPrice,
        itemCount: orderData.items.length,
      });
    }
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const orderId = `ORD-${Date.now()}`;
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Order received successfully",
        orderId 
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to process order";
    
    if (process.env.NODE_ENV === "development") {
      console.error("Error processing order:", errorMessage);
    }
    
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 }
    );
  }
}
