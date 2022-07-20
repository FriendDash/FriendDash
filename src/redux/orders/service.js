const addOrder = async order => {
  const response = await fetch(
    'https://frienddash-db.herokuapp.com/orders/add',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return data;
};

const getOrders = async () => {
  const response = await fetch('https://frienddash-db.herokuapp.com/orders', {
    method: 'GET',
  });
  return response.json();
};

const removeOrder = async _id => {
  const response = await fetch(
    `https://frienddash-db.herokuapp.com/orders/remove/${_id}`,
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
    `https://frienddash-db.herokuapp.com/orders/update/${order._id}`,
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
