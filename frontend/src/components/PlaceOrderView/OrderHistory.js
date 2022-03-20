import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox } from "../MessageBox/MessageBox";
import { orderMineList } from "./PlaceOrderView.actions";


const OrderHistory = ({}) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderMineList());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant={MessageBoxVariant.ERROR}>{error}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "NO"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "NO"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
