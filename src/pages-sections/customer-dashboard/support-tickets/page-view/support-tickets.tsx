"use client";

import { Fragment, useState } from "react";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
// Local CUSTOM COMPONENTS
import TicketCard from "../ticket-card";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import { useDashboardStore } from "store/dashboard";
import { getAllMessagesByUser } from "services/dashboardAdmin/messages";
import { useQuery } from "@tanstack/react-query";
import { Message } from "models/types";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function TicketsPageView() {
  const { profile } = useDashboardStore();
  const token = profile.token;

  const { data: messages, isLoading, isError, refetch } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: () => getAllMessagesByUser(token!),
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!token,
  });

  // Número de tickets por página
  const TICKETS_PER_PAGE = 8;

  // Estado para manejar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular los índices para paginar
  const startIndex = (currentPage - 1) * TICKETS_PER_PAGE;
  const endIndex = startIndex + TICKETS_PER_PAGE;

  // Obtener los tickets de la página actual
  const currentMessages = messages?.slice(startIndex, endIndex);

  // Total de páginas
  const totalPages = Math.ceil((messages?.length || 0) / TICKETS_PER_PAGE);

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader title="Support Ticket" href="/contact" Icon={CustomerService} buttonText="Contact Us" />

      {/* SUPPORT TICKET LIST AREA */}
      {isLoading ?
        <Box display={"flex"} justifyContent="center" alignItems="center">
          <CircularProgress sx={{ width: '100%' }} />
        </Box>
        :
        isError ?
        <Typography variant="h5" color={'white'} textAlign="center">
          Failed to load tickets
        </Typography>
          : currentMessages?.map((item) => (
            <TicketCard ticket={item} key={item.id} />
          ))}

      {/* PAGINATION AREA */}
      <Pagination
        count={totalPages}
        page={currentPage} // Asegurar que el estado esté sincronizado
        onChange={(event, page) => setCurrentPage(page)}
      />
    </Fragment>
  );
}
