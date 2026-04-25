import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, Lock, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const CheckoutForm = ({ productId, productName, amount, onContextClose, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1. Create Payment Session on the backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email }),
      });
      const { clientSecret } = await response.json();

      // 2. Confirm the payment on the frontend
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          onSuccess();
        }
      }
    } catch (err) {
      setError('Błąd połączenia z serwerem płatności.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all focus-within:border-gold/50">
          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Adres E-mail</label>
          <input 
            type="email"
            required
            placeholder="twoj@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all focus-within:border-gold/50">
          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Dane Karty Płatniczej</label>
          <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#ffffff',
              '::placeholder': { color: '#ffffff40' },
              iconColor: '#D4AF37',
            },
          }
        }} />
      </div>

      {error && (
        <div className="text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-4 bg-gold text-black font-bold rounded-xl shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
      >
        {processing ? (
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            Zapłać {(amount / 100).toFixed(2)} PLN
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-[10px] text-white/30 uppercase tracking-tighter">
        <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Payment</div>
        <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</div>
      </div>
    </form>
  );
};

export default function PaymentModal({ isOpen, onClose, product }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#1a1c1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header / Brand Strip */}
            <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
            
            <div className="p-8">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-4 border border-gold/20">
                  <CreditCard className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-2xl font-light text-white mb-2 tracking-tight">
                  Finalizuj <span className="text-gold font-medium">Dostęp</span>
                </h2>
                <p className="text-white/40 text-sm max-w-[240px]">
                  Odblokuj {product.name} i pogłęb swoją wiedzę o gwiazdach.
                </p>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm 
                  productId={product.id}
                  productName={product.name}
                  amount={product.amount}
                  onContextClose={onClose}
                  onSuccess={() => {
                    alert('Sukces! Raport został odblokowany.');
                    onClose();
                  }}
                />
              </Elements>
            </div>

            {/* Footer Trust Section */}
            <div className="bg-white/[0.02] border-t border-white/5 p-6 flex justify-between items-center px-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-4 opacity-30 grayscale" alt="Stripe" />
              <div className="flex gap-2">
                <div className="w-6 h-4 bg-white/10 rounded-sm" />
                <div className="w-6 h-4 bg-white/10 rounded-sm" />
                <div className="w-6 h-4 bg-white/10 rounded-sm" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
