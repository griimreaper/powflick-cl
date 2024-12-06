import { FC } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
// GLOBAL CUSTOM COMPONENTS
import { H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { Order, ProductDB } from "models/types";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { order: Order };
// ==============================================================

export default function OrderedProducts({ order }: Props) {
  const { id, createdAt, products, updatedAt, customizations } = order || {};

  return (
    <Card sx={{ p: 0, mb: "30px" }}>
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Order ID:" value={id} />
        <Item title="Placed on:" value={new Date(createdAt).toDateString()} />
        <Item
          title="Delivered on:"
          value={updatedAt ? format(new Date(updatedAt), "dd MMM, yyyy") : "None"}
        />
      </FlexBetween>

      {products?.map((item: any | ProductDB, ind) => (
        <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
          <FlexBox gap={2.5} alignItems="center">
            <Avatar alt={item.title} src={item.URL} sx={{ height: 64, width: 64 }} />

            <div>
              <H6>{item.title}</H6>
              <Paragraph color="grey.600">
                {currency(item.OrderProduct?.price)} x {item.OrderProduct?.amount}
              </Paragraph>
            </div>
          </FlexBox>

          <Paragraph color="grey.600" ellipsis>
            Product properties: {customizations?.find(c => c.productId === item.id)?.customization.size}
          </Paragraph>

          <Button variant="text" color="primary">
            Write a Review
          </Button>
        </FlexBetween>
      ))}
    </Card>
  );
}

function Item({ title, value }: { title: string; value: number | string}) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph>{value}</Paragraph>
    </FlexBox>
  );
}
