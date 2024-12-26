import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { format } from "date-fns";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { OrderStateEnum, User } from "models/types";

// ==============================================================
interface Props {
  id: string;
  status: string;
  createdAt: string;
  customer: Partial<User>;
  onStatusChange: (newStatus: string) => void; // New prop for notifying status changes
}
// ==============================================================

export default function OrderActions({ id, createdAt, status, customer, onStatusChange }: Props) {
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value;
    onStatusChange(newStatus); // Notify parent of the new status
  };
  return (
    <div>
      <FlexBox flexWrap="wrap" alignItems="center" columnGap={4} rowGap={1}>
        <Paragraph>
          <Span color="grey.600">Order ID:</Span> {id}
        </Paragraph>

        <Paragraph>
          <Span color="grey.600">Placed on:</Span> {format(new Date(createdAt), "dd MMM, yyyy")}
        </Paragraph>

        <Paragraph>
          <Span color="grey.600">Customer:</Span> {customer?.firstName + ' ' + customer?.lastName}
        </Paragraph>
      </FlexBox>

      <FlexBox gap={3} my={3} flexDirection={{ sm: "row", xs: "column" }}>
        {/* <TextField
          fullWidth
          color="info"
          size="medium"
          variant="outlined"
          label="Add Product"
          placeholder="Type product name"
        /> */}

        <TextField
          select
          fullWidth
          color="info"
          size="medium"
          defaultValue={status}
          label="Order Status"
          onChange={handleStatusChange} // Handle status change
          inputProps={{
            IconComponent: () => <KeyboardArrowDown sx={{ color: "grey.600", mr: 1 }} />
          }}>
            {Object.values(OrderStateEnum).map((s,i) => (
              <MenuItem key={i} value={s}>{s}</MenuItem>
            ))}
        </TextField>
      </FlexBox>
    </div>
  );
}
