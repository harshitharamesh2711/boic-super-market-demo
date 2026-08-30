import React, { useState, useEffect } from 'react';
import { TabType, CategoryId, Product, CartItem, Order } from './types';
import { STORE_INFO, PRODUCTS_DATA } from './data/products';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { CartScreen } from './components/CartScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { CallModal } from './components/CallModal';
import { PolicyModal } from './components/PolicyModal';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'shipping' | null>(null);

  // Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boic_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State with Sample Past Order
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('boic_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'BOIC-849201',
        date: 'Yesterday, 4:15 PM',
        items: [
          { product: PRODUCTS_DATA[0], quantity: 2 },
          { product: PRODUCTS_DATA[6], quantity: 1 }
        ],
        subtotal: 12.47,
        deliveryFee: 0,
        discount: 0,
        total: 13.09,
        status: 'Delivered',
        deliveryAddress: '123 Local Street, Apt 4B, Your Town',
        paymentMethod: 'Cash on Delivery',
        timeSlot: 'Yesterday • 5:00 PM – 7:00 PM'
      }
    ];
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('boic_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  // Save Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('boic_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Nav actions
  const handleCategorySelectFromHome = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 25.0;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = isFreeDelivery ? 0 : subtotal > 0 ? 2.99 : 0;
  const estimatedTax = subtotal * 0.05;
  const total = subtotal + deliveryFee + estimatedTax;

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1A1A] flex flex-col font-serif antialiased selection:bg-[#1A1A1A] selection:text-[#F4F1EA]">
      {/* Top App Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => {
          setActiveTab('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoHome={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-md md:max-w-xl lg:max-w-2xl mx-auto w-full px-4 pt-4 pb-24">
        {activeTab === 'home' && (
          <HomeScreen
            storeInfo={STORE_INFO}
            onSelectCategory={handleCategorySelectFromHome}
            onOpenCall={() => setIsCallOpen(true)}
            onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            onOpenPolicy={(type) => setPolicyType(type)}
            featuredProducts={PRODUCTS_DATA}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesScreen
            products={PRODUCTS_DATA}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            cartItems={cartItems}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            onUpdateQuantity={handleUpdateQuantity}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {activeTab === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onGoToShop={() => {
              setActiveTab('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartCheckout={() => setIsCheckoutOpen(true)}
            onOpenWhatsAppOrder={() => setIsWhatsAppOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            orders={orders}
            storeInfo={STORE_INFO}
            onOpenCall={() => setIsCallOpen(true)}
            onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
            onOpenPolicy={(type) => setPolicyType(type)}
            onGoToShop={() => {
              setActiveTab('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={0}
        total={total}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* WhatsApp Assistant Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        cartItems={cartItems}
        storeInfo={STORE_INFO}
      />

      {/* Call Dialer Modal */}
      <CallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        storeInfo={STORE_INFO}
      />

      {/* Policy Modal */}
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
}
