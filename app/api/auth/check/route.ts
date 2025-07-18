import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createServerClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Get user metadata
    const { data: metadata } = await supabase
      .from('user_metadata')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({
      authenticated: true,
      user: {
        ...user,
        plan: metadata?.plan || 'free',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}