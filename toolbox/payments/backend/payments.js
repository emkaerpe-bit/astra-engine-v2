import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Product Dictionary
const PRODUCTS = {
  'natal_report_premium': {
    id: 'natal_report_premium',
    name: 'Raport Natalny Premium',
    amount: 4700,
    currency: 'pln',
    type: 'one_time',
    description: 'Pełna interpretacja astrologiczna Twojego kosmogramu natalnego.'
  },
  'astra_pro_subscription': {
    id: 'astra_pro_subscription',
    name: 'Astra Pro (Miesięczny)',
    amount: 2900,
    currency: 'pln',
    type: 'subscription',
    priceId: 'price_placeholder', // You need to create this in Stripe Dashboard
    description: 'Dostęp do Labu Tranzytów i codziennych prognoz AI.'
  }
};

/**
 * Creates a Stripe Payment Intent or Subscription Client Secret.
 */
export async function createPaymentSession(productId, customerEmail) {
  const product = PRODUCTS[productId];
  if (!product) throw new Error('Invalid product ID');

  if (product.type === 'one_time') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amount,
      currency: product.currency,
      metadata: { productId },
      automatic_payment_methods: { enabled: true },
    });
    return { clientSecret: paymentIntent.client_secret, type: 'one_time' };
  } 
  
  if (product.type === 'subscription') {
    // 1. Create or find customer
    let customer;
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email: customerEmail });
    }

    // 2. Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: product.priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      type: 'subscription'
    };
  }
}

export function verifyWebhook(payload, signature) {
  return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
}

export { PRODUCTS };
