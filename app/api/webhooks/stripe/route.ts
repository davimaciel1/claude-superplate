import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object as Stripe.Checkout.Session
      
      // Fulfill the purchase...
      try {
        // await fulfillOrder(checkoutSession)
        console.log('Checkout session completed:', checkoutSession.id)
      } catch (error) {
        console.error('Error fulfilling order:', error)
        return NextResponse.json(
          { error: 'Error fulfilling order' },
          { status: 500 }
        )
      }
      break

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription
      
      try {
        // await updateSubscription(subscription)
        console.log('Subscription updated:', subscription.id)
      } catch (error) {
        console.error('Error updating subscription:', error)
        return NextResponse.json(
          { error: 'Error updating subscription' },
          { status: 500 }
        )
      }
      break

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription
      
      try {
        // await cancelSubscription(deletedSubscription.id)
        console.log('Subscription cancelled:', deletedSubscription.id)
      } catch (error) {
        console.error('Error cancelling subscription:', error)
        return NextResponse.json(
          { error: 'Error cancelling subscription' },
          { status: 500 }
        )
      }
      break

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice
      
      try {
        // await recordPayment(invoice)
        console.log('Payment succeeded:', invoice.id)
      } catch (error) {
        console.error('Error recording payment:', error)
        return NextResponse.json(
          { error: 'Error recording payment' },
          { status: 500 }
        )
      }
      break

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice
      
      try {
        // await handleFailedPayment(failedInvoice)
        console.log('Payment failed:', failedInvoice.id)
      } catch (error) {
        console.error('Error handling failed payment:', error)
        return NextResponse.json(
          { error: 'Error handling failed payment' },
          { status: 500 }
        )
      }
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}