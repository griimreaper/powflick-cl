import MuiPagination, { PaginationProps } from "@mui/material/Pagination";

export default function Pagination(props: PaginationProps) {
  return (
    <MuiPagination
      color="primary"
      variant="text"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        ".MuiPaginationItem-root": {
          backgroundColor: "white",
          color: "black",
        },
        ".Mui-selected": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
      {...props}
    />
  );
}
