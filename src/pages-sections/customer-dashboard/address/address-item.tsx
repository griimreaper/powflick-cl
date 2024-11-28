import Link from "next/link";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// LOCAL CUSTOM COMPONENT
import TableRow from "../table-row";
// CUSTOM DATA MODEL
import { Direction } from "models/types";

// ==============================================================
interface Props {
  direction: Direction;
  handleDelete: (id: string) => void;
}
// ==============================================================

export default function AddressListItem({ direction, handleDelete }: Props) {
  const { country, address, city, phone, district, addressReference, neighborhood, postalCode, id } = direction || {};

  return (
    <Link href={`/address/${id}`}>
      <TableRow>
        <Paragraph ellipsis>{addressReference}</Paragraph>
        <Paragraph ellipsis>{`${country}, ${city}`}</Paragraph>
        <Paragraph ellipsis>{phone}</Paragraph>
        <Paragraph color="grey.600">
          <IconButton>
            <Edit fontSize="small" color="inherit" />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete(id);
            }}>
            <Delete fontSize="small" color="inherit" />
          </IconButton>
        </Paragraph>
      </TableRow>
    </Link>
  );
}
