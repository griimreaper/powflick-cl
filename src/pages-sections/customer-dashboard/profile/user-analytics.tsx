import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { H3, H5, Paragraph, Small } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { Profile, OrderStateEnum } from "models/types";
// ==============================================================
type Props = { user: Profile['genericResponseUser'] };
// ==============================================================

export default function UserAnalytics({ user }: Props) {
  const INFO_LIST = [
    { title: user.orders.length, subtitle: "All Orders" },
    { title: user.orders.filter(o => o.state === OrderStateEnum.PENDIENTE).length, subtitle: "Awaiting Payments" },
    { title: user.orders.filter(o => o.state === OrderStateEnum.PENDIENTE).length, subtitle: "Awaiting Shipment" },
    { title: user.orders.filter(o => o.state === OrderStateEnum.ENCAMINO).length, subtitle: "Awaiting Delivery" }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <Card
          sx={{
            gap: 2,
            height: "100%",
            display: "flex",
            p: "1rem 1.5rem",
            alignItems: "center"
          }}>
          <Avatar alt={user.firstName} src={user.image} sx={{ height: 64, width: 64 }} />

          <FlexBetween flexWrap="wrap" flex={1}>
            <div>
              <H5>{`${user.firstName} ${user.lastName}`}</H5>

              <FlexBox alignItems="center" gap={1}>
                <Paragraph color="grey.600">Balance:</Paragraph>
                <Paragraph color="primary.main">{currency(500)}</Paragraph>
              </FlexBox>
            </div>

            <Paragraph color="grey.600" letterSpacing={3}>
              SILVER USER
            </Paragraph>
          </FlexBetween>
        </Card>
      </Grid>

      <Grid item container spacing={3} md={6} xs={12}>
        {INFO_LIST.map((item) => (
          <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                p: "1rem 1.25rem",
                alignItems: "center",
                flexDirection: "column"
              }}>
              <H3 color="primary.main" my={0} fontWeight={600}>
                {item.title}
              </H3>

              <Small color="grey.600" textAlign="center">
                {item.subtitle}
              </Small>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
