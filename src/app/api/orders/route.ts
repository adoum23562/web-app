// @ts-nocheck — Supabase types not generated; tables resolve to `never` without `supabase gen types`
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { customerInfo, items } = body;

    // Validate request
    if (!customerInfo || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate customer info
    const { email, name, phone, address, city, notes } = customerInfo;
    if (!email || !name || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing customer information' },
        { status: 400 }
      );
    }

    // Validate items
    for (const item of items) {
      if (!item.product_id || !item.quantity || item.quantity <= 0) {
        return NextResponse.json(
          { error: 'Invalid cart items' },
          { status: 400 }
        );
      }
    }

    // Check if customer exists or create new one
    const db = supabase as any;
    let customer;
    const { data: existingCustomer } = await db
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      // Update existing customer
      const { data: updatedCustomer, error: updateError } = await db
        .from('customers')
        .update({ name, phone, address, city })
        .eq('id', existingCustomer.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating customer:', updateError);
        return NextResponse.json(
          { error: 'Failed to update customer' },
          { status: 500 }
        );
      }
      customer = updatedCustomer;
    } else {
      // Create new customer
      const { data: newCustomer, error: createError } = await db
        .from('customers')
        .insert({ email, name, phone, address, city })
        .select()
        .single();

      if (createError) {
        console.error('Error creating customer:', createError);
        return NextResponse.json(
          { error: 'Failed to create customer' },
          { status: 500 }
        );
      }
      customer = newCustomer;
    }

    // Verify stock availability for all items
    for (const item of items) {
      const { data: product } = await db
        .from('products')
        .select('stock')
        .eq('id', item.product_id)
        .single();

      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${item.product_id}` },
          { status: 400 }
        );
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const { data: product } = await db
        .from('products')
        .select('*')
        .eq('id', item.product_id)
        .single();

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} not found` },
          { status: 404 }
        );
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: product.price,
        total_price: itemTotal,
      });
    }

    // Generate order number
    const orderNumber = generateOrderNumber();
    const accessToken = randomUUID();

    // Create order
    const { data: order, error: orderError } = await db
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: customer.id,
        total_amount: totalAmount,
        status: 'pending',
        payment_status: 'unpaid',
        access_token: accessToken,
        notes: notes || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItemsWithOrderId = orderItemsData.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await db
      .from('order_items')
      .insert(orderItemsWithOrderId);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback: delete the order
      await db.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    // Update product stock
    for (const item of items) {
      const { data: product } = await db
        .from('products')
        .select('stock')
        .eq('id', item.product_id)
        .single();

      if (product) {
        await db
          .from('products')
          .update({ stock: product.stock - item.quantity })
          .eq('id', item.product_id);
      }
    }

    // Return order details
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_number: order.order_number,
        total_amount: order.total_amount,
        status: order.status,
        access_token: accessToken,
        created_at: order.created_at,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      { error: 'Orders listing is not public' },
      { status: 405 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
