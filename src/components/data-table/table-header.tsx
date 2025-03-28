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
import { Select } from "@mui/material";

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
  changeOrder?: boolean;
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
    changeOrder = false,
    onFilterChange = () => { },
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<{ [key: string]: string }>({});
  const [filterColumn, setFilterColumn] = useState<string | null>(null);

  const [selectedHeaders, setSelectedHeaders] = useState<{ [key: number]: string }>(
    heading.reduce((acc, item, index) => {
      if (Array.isArray(item)) acc[index] = item[0].id; // Selecciona la primera opción por defecto
      return acc;
    }, {})
  );

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
      // Si la opción ya está seleccionada, no hacer nada

    } else {
      // Si no está seleccionada, actualizarla
      updatedFilters[columnId] = option;
    }

    setSelectedFilter(updatedFilters);
    onFilterChange(columnId, updatedFilters[columnId] || null); // Notificar al componente padre
    onFilterChange('orderBy', columnId);
    handleFilterClose(); // Cerrar el menú después de la selección
  };
  console.log(selectedHeaders);

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

        {heading.map((headCell, index) => {
          const isArray = Array.isArray(headCell);
          const selectedHeadCell = isArray ? headCell.find(h => h.id === selectedHeaders[index]) || headCell[0] : headCell;

          return (
            <StyledTableCell key={index} align={selectedHeadCell.align}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {isArray ? (
                  <Select
                    value={selectedHeaders[index]}
                    onChange={(e) => {
                      e.preventDefault()
                      setSelectedHeaders((prev) => ({ ...prev, [index]: e.target.value }));
                    }}
                    size="small"
                  >
                    {headCell.map((option) => (
                      <MenuItem key={option.id} value={option.id}
                        onClick={() => {
                          if (option.section === 1) {
                            onFilterChange('orderBy', option.id)
                            if (changeOrder) {
                              onFilterChange('order', option.id)
                            }
                          } else if (option.section === 2) {
                            onFilterChange('section2', option.id)
                          }
                        }}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TableSortLabel
                    active={orderBy === selectedHeadCell.id}
                    onClick={() => !selectedHeadCell.content && onRequestSort(selectedHeadCell.id)}
                    sx={{ "& .MuiTableSortLabel-icon": { opacity: 1 } }}
                    IconComponent={() => !selectedHeadCell.content && <UpDown sx={{ fontSize: 14, ml: 1, color: "grey.600" }} />}
                  >
                    {selectedHeadCell.label}
                  </TableSortLabel>
                )}

                {selectedHeadCell.content && (
                  <>
                    <IconButton size="small" onClick={(e) => handleFilterOpen(e, selectedHeadCell.id)}>
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open && filterColumn === selectedHeadCell.id} onClose={handleFilterClose}>
                      {selectedHeadCell.content.map((option: string) => (
                        <MenuItem
                          key={option}
                          onClick={() => handleFilterSelect(selectedHeadCell.id, option)}
                          selected={selectedFilter[selectedHeadCell.id] === option}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </div>
            </StyledTableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
