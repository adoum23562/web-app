import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
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
    let customer;
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      // Update existing customer
      const { data: updatedCustomer, error: updateError } = await supabase
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
      const { data: newCustomer, error: createError } = await supabase
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
      const { data: product } = await supabase
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
      const { data: product } = await supabase
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

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: customer.id,
        total_amount: totalAmount,
        status: 'pending',
        payment_status: 'unpaid',
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

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsWithOrderId);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback: delete the order
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    // Update product stock
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.product_id)
        .single();

      if (product) {
        await supabase
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customer_id');

    let query = supabase
      .from('orders')
      .select('*, customers(name, email), order_items(*, products(name, image_url))')
      .order('created_at', { ascending: false });

    if (customerId) {
      query = query.eq('customer_id', customerId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
