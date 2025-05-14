"use client";

import { useState, Fragment } from "react";
import Place from "@mui/icons-material/Place";
// Local CUSTOM COMPONENT
import Pagination from "../../pagination";
import AddressListItem from "../address-item";
import DashboardHeader from "../../dashboard-header";
import { useDashboardStore } from "store/dashboard";
import { deleteDirection } from "services/Directions";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "services/DashboardUser/profile";
import { Direction } from "models/types";
import { Box, CircularProgress, Typography } from "@mui/material";

const DRIECTIONS_PER_PAGE = 5; // Número de órdenes por página

export default function AddressPageView() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const { profile } = useDashboardStore();
  const token = profile.token || "";
  // Calcular las órdenes a mostrar en la página actual

  const { data: directions = [], isLoading, isError, refetch } = useQuery<Direction[]>({
    queryKey: ["user-address"],
    queryFn: () => getUserAddress(token),
    enabled: !!token,
    refetchOnMount: true,
    staleTime: 0, // 5 minutes
  });

  const startIndex = (currentPage - 1) * DRIECTIONS_PER_PAGE;
  const currentDirections = directions?.slice(startIndex, startIndex + DRIECTIONS_PER_PAGE);

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = async (id: string) => {
    if (token && id) {
      try {
        const response = await deleteDirection(token, id);
        showSuccessAlert("Success!", response.message);
        refetch();
      } catch (error) {
        showErrorAlert(
          "Error!",
          `Error deleting direction: ${error}`
        );
      }
    } else {
      return
    }
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Place}
        href="/dashboard/address/new"
        title="My Addresses"
        buttonText="Add New Address"
      />

      {/* ALL ADDRESS LIST AREA */}
      {isLoading ?
        <Box display={"flex"} justifyContent="center" alignItems="center">
          <CircularProgress sx={{ width: '100%' }} />
        </Box>
        :
        isError ? <Typography variant="h5" color={'white'} textAlign="center">
          Failed to load orders
        </Typography>
          : directions.length === 0 ?
            <Typography variant="h5" color={'white'} textAlign="center">
              No Address
            </Typography>
            : currentDirections?.map((address) => (
              <AddressListItem key={address.id} direction={address} handleDelete={handleAddressDelete} />
            ))}

      {/* PAGINATION AREA */}
      <Pagination
        count={Math.ceil(directions?.length / DRIECTIONS_PER_PAGE)} // Número total de páginas
        page={currentPage} // Página actual
        onChange={(event, page) => setCurrentPage(page)} // Cambiar página
      />
    </Fragment>
  );
}
