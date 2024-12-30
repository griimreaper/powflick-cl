"use client";

import { Fragment, useState } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// Local CUSTOM COMPONENTS
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { useDashboardStore } from "store/dashboard";

// ====================================================
const ORDERS_PER_PAGE = 8; // Número de órdenes por página
// ====================================================

export default function OrdersPageView() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const { profile } = useDashboardStore();
  const { genericResponseUser } = profile;
  const { orders } = genericResponseUser;

  // Calcular las órdenes a mostrar en la página actual
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      {/* ORDER LIST AREA */}
      {[...currentOrders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Convertir a timestamps
        .map((order) => (
          <OrderRow order={order} key={order.id} />
        ))}

      {/* ORDERS PAGINATION */}
      <Pagination
        count={Math.ceil(orders.length / ORDERS_PER_PAGE)} // Número total de páginas
        page={currentPage} // Página actual
        onChange={(event, page) => setCurrentPage(page)} // Cambiar página 
      />
    </Fragment>
  );
}
