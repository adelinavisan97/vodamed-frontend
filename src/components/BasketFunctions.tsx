
export const initializeBasket = () => {
    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
};

export const getBasket = () => {
    return JSON.parse(localStorage.getItem("basket") || "[]");
};

export const addToBasket = (medicationId: string) => {
    const basket = getBasket();
    basket.push(medicationId);
    localStorage.setItem("basket", JSON.stringify(basket));
};

export const clearBasket = () => {
    localStorage.setItem("basket", JSON.stringify([]));
};