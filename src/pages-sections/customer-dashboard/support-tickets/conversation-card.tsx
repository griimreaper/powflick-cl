import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H5, Span } from "components/Typography";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";
import { Message } from "models/types";
import { useDashboardStore } from "store/dashboard";

// ==============================================================
type Props = { message: Message["conversation"][0] };
// ==============================================================

export default function ConversationCard({ message }: Props) {
  const { imgUrl, name, createdAt, text, from } = message || {};
  const { profile } = useDashboardStore();

  console.log(from);
  
  return (
    <FlexBox gap={2} mb={4}>
      <Avatar src={from === 'admin' ? imgUrl : profile.genericResponseUser.image} alt={name} />

      <div>
        <H5 fontWeight="600" mt={0} mb={0}>
          {name}
        </H5>

        <Span color="grey.600">{format(new Date(createdAt), "hh:mm:a | dd MMM yyyy")}</Span>

        <Box borderRadius={2} bgcolor="grey.300" p={2} mt={2} lineHeight={1.7} textAlign="justify">
          {text}
        </Box>
      </div>
    </FlexBox>
  );
}
