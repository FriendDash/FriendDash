const addOrder = async order => {
  const response = await fetch('http://localhost:5000/orders/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const getOrders = async () => {
  const response = await fetch('http://localhost:5000/orders', {
    method: 'GET',
  });
  return response.json();
};

const removeOrder = async orderId => {
  const response = await fetch(
    `http://localhost:5000/orders/remove/${orderId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(response.errorMsg);
  }
};

const updateOrder = async order => {
  const response = await fetch(
    `http://localhost:5000/orders/update/${order.orderId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }
  );

  if (!response.ok) {
    throw new Error(response.errorMsg);
  }
};

export { addOrder, getOrders, removeOrder, updateOrder };
