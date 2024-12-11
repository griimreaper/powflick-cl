import Link from "next/link";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";
import { format } from "date-fns";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";
import { Message } from "models/types";

// ==============================================================
type Props = { ticket: Message };
// ==============================================================

export default function TicketCard({ ticket }: Props) {
  const { id, title, type, status, category, consultedAt } = ticket;

  return (
    <Link href={`/dashboard/support-tickets/${id}`} key={id}>
      <FlexBetween component={Card} px={2.5} py={2} mb={2}>
        <div>
          <Paragraph mb={1.5} lineHeight={1}>
            {title}
          </Paragraph>

          <FlexBox alignItems="center" flexWrap="wrap" gap={1}>
            <Chip label={type} size="small" />
            <Chip label={status} size="small" color="success" />

            <Span className="pre" color="grey.600">
              {new Date(consultedAt).toDateString()}
            </Span>

            <Span color="grey.600">{category}</Span>
          </FlexBox>
        </div>

        <IconButton>
          <East
            fontSize="small"
            sx={{
              color: "grey.500",
              transform: ({ direction }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`
            }}
          />
        </IconButton>
      </FlexBetween>
    </Link>
  );
}
