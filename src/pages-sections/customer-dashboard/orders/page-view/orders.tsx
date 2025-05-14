"use client";

import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
import { getUserOrders } from "services/DashboardUser/profile";
import { useDashboardStore } from "store/dashboard";
import { Order } from "models/types";
import { Box, CircularProgress, Typography } from "@mui/material";

const ORDERS_PER_PAGE = 8;

export default function OrdersPageView() {
  const [currentPage, setCurrentPage] = useState(1);
  const { profile } = useDashboardStore();
  const token = profile?.token || "";

  const { data: orders = [], isLoading, isError } = useQuery<Order[]>({
    queryKey: ["user-orders"],
    queryFn: () => getUserOrders(token),
    enabled: !!token,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const currentOrders = orders
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(startIndex, startIndex + ORDERS_PER_PAGE);

  console.log(orders);

  console.log(isError);

  return (
    <Fragment>
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />
      {isLoading ?
        <Box display={"flex"} justifyContent="center" alignItems="center">
          <CircularProgress sx={{ width: '100%' }} />
        </Box>
        :
        isError ? <Typography variant="h5" color={'white'} textAlign="center">
          Failed to load orders
        </Typography>
          : orders.length === 0 ?
            <Typography variant="h5" color={'white'} textAlign="center">
              No orders
            </Typography>
            : currentOrders.map((order) => (
              <OrderRow order={order} key={order.id} />
            ))}
      <Pagination
        count={Math.ceil(orders.length / ORDERS_PER_PAGE)}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
      />
    </Fragment>
  );
}
