"use client";

import { Fragment, useState } from "react";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
// Local CUSTOM COMPONENTS
import TicketCard from "../ticket-card";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";
import { useDashboardStore } from "store/dashboard";

export default function TicketsPageView() {
  const { profile } = useDashboardStore();
  const { messages } = profile;

  // Número de tickets por página
  const TICKETS_PER_PAGE = 5;

  // Estado para manejar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular los índices para paginar
  const startIndex = (currentPage - 1) * TICKETS_PER_PAGE;
  const endIndex = startIndex + TICKETS_PER_PAGE;

  // Obtener los tickets de la página actual
  const currentMessages = messages.slice(startIndex, endIndex);

  // Total de páginas
  const totalPages = Math.ceil(messages.length / TICKETS_PER_PAGE);

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader title="Support Ticket" Icon={CustomerService} />

      {/* SUPPORT TICKET LIST AREA */}
      {currentMessages.map((item) => (
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
