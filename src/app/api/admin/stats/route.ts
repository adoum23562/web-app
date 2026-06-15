// @ts-nocheck — Supabase types not generated
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const [
      { count: products_count },
      { count: orders_count },
      { count: customers_count },
      { data: ordersData },
      { data: recent_orders },
    ] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('customers').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('total_amount'),
      supabase
        .from('orders')
        .select('*, customers(name)')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const revenue_total = (ordersData || []).reduce(
      (sum, o) => sum + (o.total_amount || 0),
      0
    );

    return NextResponse.json({
      products_count: products_count ?? 0,
      orders_count: orders_count ?? 0,
      revenue_total,
      customers_count: customers_count ?? 0,
      recent_orders: recent_orders || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
