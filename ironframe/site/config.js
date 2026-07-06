/**
 * Ironframe browser config.
 *
 * The Stripe publishable key is safe to expose. It can initialize Stripe.js,
 * but it cannot create charges or read payment data. The secret key belongs
 * only in STRIPE_SECRET_KEY on the server.
 *
 * PLACEHOLDER swap:
 * 1. Stripe Dashboard -> Developers -> API keys.
 * 2. Copy the test publishable key, starting with pk_test_.
 * 3. Replace pk_test_PLACEHOLDER below.
 * 4. When going live, replace it with pk_live_ at the same time the Vercel
 *    STRIPE_SECRET_KEY env var is changed to sk_live_.
 */
window.IRONFRAME_CONFIG = {
  stripePublishableKey: 'pk_test_PLACEHOLDER',
};
