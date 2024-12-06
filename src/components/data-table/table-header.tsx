import { useState } from "react";
import styled from "@mui/material/styles/styled";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
// CUSTOM ICON COMPONENT
import UpDown from "icons/UpDown";

// STYLED COMPONENTS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: theme.palette.grey[900],
}));

// ----------------------------------------------------------------------
interface Props {
  heading: any[];
  orderBy: string;
  rowCount: number;
  numSelected: number;
  order: "asc" | "desc";
  hideSelectBtn?: boolean;
  onRequestSort: Function;
  onSelectAllClick?: (checked: boolean, defaultSelect: string) => void;
  onFilterChange?: Function;
}
// ----------------------------------------------------------------------

export default function TableHeader(props: Props) {
  const {
    order,
    heading,
    orderBy,
    rowCount,
    numSelected,
    onRequestSort,
    onSelectAllClick = () => { },
    hideSelectBtn = false,
    onFilterChange = () => { },
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: string }>({});
  const [filterColumn, setFilterColumn] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  const handleFilterOpen = (event: React.MouseEvent<HTMLButtonElement>, columnId: string) => {
    setAnchorEl(event.currentTarget);
    setFilterColumn(columnId);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setFilterColumn(null);
  };

  const handleFilterSelect = (columnId: string, option: string) => {
    const updatedFilters = { ...selectedFilter };

    if (selectedFilter[columnId] === option) {
      // Si la opción ya está seleccionada, eliminarla del filtro
      delete updatedFilters[columnId];
    } else {
      // Si no está seleccionada, actualizarla
      updatedFilters[columnId] = option;
    }

    setSelectedFilter(updatedFilters);
    onFilterChange(columnId, updatedFilters[columnId] || null); // Notificar al componente padre
    handleFilterClose(); // Cerrar el menú después de la selección
  };

  return (
    <TableHead sx={{ backgroundColor: "grey.200" }}>
      <TableRow>
        {!hideSelectBtn ? (
          <StyledTableCell align="left">
            <Checkbox
              color="info"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAllClick(event.target.checked, "product")}
            />
          </StyledTableCell>
        ) : null}

        {heading.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TableSortLabel
                active={orderBy === headCell.id}
                onClick={() => !headCell.content && onRequestSort(headCell.id)}
                sx={{ "& .MuiTableSortLabel-icon": { opacity: 1 } }}
                IconComponent={() => !headCell.content || headCell.content === null && <UpDown sx={{ fontSize: 14, ml: 1, color: "grey.600" }} />}
              >
                {headCell.label}
              </TableSortLabel>
              {headCell.content && (
                <>
                  <IconButton
                    size="small"
                    onClick={(e) => handleFilterOpen(e, headCell.id)}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && filterColumn === headCell.id}
                    onClose={handleFilterClose}
                  >
                    {headCell.content.map((option: string) => (
                      <MenuItem
                        key={option}
                        onClick={() => handleFilterSelect(headCell.id, option)}
                        selected={selectedFilter[headCell.id] === option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </div>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
