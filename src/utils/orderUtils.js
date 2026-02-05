export const generateOrderId = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-${dateStr}-${randomStr}`;
};

export const saveOrder = (orderData) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
};

export const getOrders = (userEmail) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (userEmail) {
        return orders.filter(order => order.userEmail === userEmail);
    }
    return orders;
};

export const getOrderById = (orderId) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find(order => order.orderId === orderId);
};
