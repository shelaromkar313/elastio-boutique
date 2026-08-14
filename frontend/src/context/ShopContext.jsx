import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsData } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('estilo_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      // Filter out any corrupted items missing a valid product with a price
      const valid = parsed.filter(
        (item) => item && item.product && typeof item.product.price === 'number'
      );
      return valid.length > 0 ? valid : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('estilo_wishlist');
      return saved ? JSON.parse(saved) : [productsData[1], productsData[3]];
    } catch {
      return [];
    }
  });

  // Modal Controls
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('estilo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('estilo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Notification Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Functions
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('estilo_cart');
  };

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const colorName = typeof selectedColor === 'object' ? selectedColor.name : selectedColor || product.colors[0]?.name;
    const sizeName = selectedSize || product.sizes[0];

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorName && item.selectedSize === sizeName
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedColor: colorName, selectedSize: sizeName, quantity }];
      }
    });

    showToast(`Added "${product.name.slice(0, 26)}..." to your bag!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, colorName, sizeName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor === colorName && item.selectedSize === sizeName)
      )
    );
    showToast('Item removed from your bag.');
  };

  const updateQuantity = (productId, colorName, sizeName, newQty) => {
    if (newQty < 1) {
      removeFromCart(productId, colorName, sizeName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedColor === colorName && item.selectedSize === sizeName) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast('Removed from your Wishlist.');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added "${product.name.slice(0, 26)}..." to Wishlist!`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Calculated Stats
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + ((item?.product?.price ?? 0) * (item?.quantity ?? 0)), 0);
  const freeShippingThreshold = 3999;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <ShopContext.Provider
      value={{
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideOpen,
        setSizeGuideOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        cartCount,
        cartSubtotal,
        freeShippingThreshold,
        freeShippingProgress
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
