

export interface BasketItem {
    medicineId: string;
    quantity: number;
  }

export const initializeBasket = () => {
    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
};

export const getBasket = () => {
    return JSON.parse(localStorage.getItem("basket") || "[]");
};

export const addToBasket = (medicineId: string, quantity: number = 1) => {
    const basket = getBasket();
    const existingItem = basket.find((item) => item.medicineId === medicineId);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      basket.push({ medicineId, quantity });
    }
  
    localStorage.setItem("basket", JSON.stringify(basket));
  };

export const clearBasket = () => {
    localStorage.setItem("basket", JSON.stringify([]));
};

export const updateBasketItemQuantity = (medicineId: string, quantity: number) => {
    const basket = getBasket();
    const itemIndex = basket.findIndex((item) => item.medicineId === medicineId);
  
    if (itemIndex !== -1) {
      if (quantity > 0) {
        basket[itemIndex].quantity = quantity;
      } else {
        basket.splice(itemIndex, 1); // Remove item if quantity is 0 or less
      }
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  };