import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { returnUrl } = await req.json()

    // Get Stripe customer
    // const customer = await getStripeCustomer(userId)
    
    // if (!customer) {
    //   return NextResponse.json(
    //     { error: 'No customer found' },
    //     { status: 404 }
    //   )
    // }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: 'cus_test123', // Replace with actual customer ID
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { error: 'Error creating portal session' },
      { status: 500 }
    )
  }
}