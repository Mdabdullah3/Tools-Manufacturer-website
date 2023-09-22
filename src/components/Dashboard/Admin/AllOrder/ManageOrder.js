import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageOrder = () => {
  const [allORders, setAllOrders] = useState([]);
  useEffect(() => {
    const url = `https://ford-server.onrender.com/myOrders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllOrders(data));
  }, []);

  const handlShiphed = (id) => {
    const url = `https://ford-server.onrender.com/orders/shipped/${id}`;
    fetch(url, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(data => {
        window.location.reload(false);
        toast.success(`Shipped Succesfull`);

      })
  }

  console.log(allORders)
  return (
    <div>
      <div>
        <div class="overflow-x-auto mt-20">
          <table class="table mx-auto">
            <thead>
              <tr>
                <th className="bg-primary"></th>
                <th className="text-lg text-secondary font-semibold bg-primary">
                  Name
                </th>
                <th className="text-lg text-secondary font-semibold bg-primary">
                  Email
                </th>
                <th className="text-lg text-secondary font-semibold bg-primary">
                  Product
                </th>
                <th className="text-lg text-secondary font-semibold bg-primary">
                  Price
                </th>
                <th className="text-lg text-secondary font-semibold bg-primary">
                  Pay Order
                </th>
              </tr>
            </thead>
            <tbody>
              {allORders.map((item, index) => (
                <tr className="border-2 border-primary">
                  <th className="text-lg text-secondary">{index + 1}</th>
                  <td className="text-lg text-secondary">
                    {item.user ? item.user : "Not Found"}
                  </td>
                  <td className="text-lg text-secondary">{item.email}</td>
                  <td className="text-lg text-secondary">{item.product}</td>
                  <td className="text-lg text-secondary">{item.price}</td>
                  <td>
                    {item.status ?
                      <button onClick={() => handlShiphed(item._id)} className="btn btn-outline btn-primary btn-sm text-secondary">
                        {item.status}
                      </button>
                      :
                      <span className="text-primary font-semibold text-lg">
                        UnPaid
                      </span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
