import React, { FC } from "react";
import { Metadata } from "next";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface pageProps { }

export const metadata: Metadata = {
  title: "Return & Refund - Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/en/return-refund",
    languages: {
      en: "https://www.powflick.com/en/return-refund",
      es: "https://www.powflick.com/es/return-refund",
      "x-default": "https://www.powflick.com/en/return-refund",
    },
  },
};

const page: FC<pageProps> = ({ }) => {
  return (
    <Container maxWidth="xl" style={{ color: "white" }}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Return & Refund Policy
        </Typography>
        <Typography paragraph>
          At Powflick, we understand how important it is for you and your team
          to have a uniform that truly represents you. That&rsquo;s why every
          order is unique, and we treat it as such. We take quality very
          seriously, from material selection to the final print, including
          manual quality control, piece by piece. To ensure everything is
          perfect, we&rsquo;ll keep you informed at every step, even sending you
          a sample of the printed fabric for you to confirm the colors and
          design before final production. All of this is backed by our 10+ years
          of experience.
        </Typography>
        <Typography paragraph>
          We know that sometimes, very rarely, things may not go as expected.
          Although we work with personalized products, if there is a genuine
          problem with your order, we are here to help! Please read our policy
          below so you know what to do.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Cancellations:
        </Typography>
        <Typography paragraph>
          We understand that unforeseen circumstances may arise. Here&rsquo;s
          our cancellation policy:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Free Cancellation: If you need to cancel your order shortly after placing it, you can do so free of charge within the first 2 hours." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Cancellation with Fee: If you request cancellation after the first 2 hours, but before your order enters the production phase, a 10% charge of the total order value will be applied to cover administrative costs." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Cancellation Not Possible: It is important to note that once your order has entered the production phase, it will no longer be possible to cancel it. This is due to the personalized nature of our products." />
          </ListItem>
        </List>
        <Typography paragraph>
          <strong>How to Request a Cancellation:</strong>
          <br />
          To request a cancellation, please contact our customer service team
          via the following email address: support@powflick.com
          <br />
          Be sure to include your order number and the reason for cancellation
          in your message.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          2. Returns (Customized Products):
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          2.1 General Policy:
        </Typography>
        <Typography paragraph>
          Because at Powflick we make each product in a personalized way,
          following your specific designs and instructions, we do not accept
          returns of customized products, except in the cases detailed below. It
          is important to emphasize that, once manufactured, these products have
          no commercial value to us.
        </Typography>
        <Typography paragraph>
          <strong>Conditions for a Return:</strong>
          <br />
          Returns will only be considered in the following cases:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Serious Manufacturing Defect: If the product has a manufacturing defect that prevents its normal use." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Serious Error in Customization: If there is a substantial difference between the product received and the instructions provided by you, including the prior design confirmation." />
          </ListItem>
        </List>
        <Typography variant="h6" component="h3" gutterBottom>
          2.2 Exclusions:
        </Typography>
        <Typography paragraph>Returns will not be accepted for:</Typography>
        <List>
          <ListItem>
            <ListItemText primary="• Minor errors or variations that do not significantly affect the appearance or functionality of the product." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Disagreement with the design if the submitted sample was previously approved." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Damage caused by misuse, improper care, or normal wear and tear of the product." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Changes of mind." />
          </ListItem>
        </List>
        <Typography variant="h6" component="h3" gutterBottom>
          2.3 Claim Filing Period:
        </Typography>
        <Typography paragraph>
          You have 7 business days, from the date of receipt of the order, to
          file a claim.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          2.4 How to File a Claim:
        </Typography>
        <Typography paragraph>
          Contact our customer service team via: support@powflick.com
          <br />
          Indicate your order number.
          <br />
          Provide a detailed description of the problem.
          <br />
          Attach clear and detailed photographs that demonstrate the defect or
          error. This requirement is essential.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          2.5 Claim Evaluation:
        </Typography>
        <Typography paragraph>
          Our team will carefully review your claim and the evidence provided.
          We reserve the right to reject claims that do not meet the established
          conditions or that lack sufficient evidence.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          2.6 Resolution of Accepted Claims:
        </Typography>
        <Typography paragraph>
          If your claim is considered valid and justified:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• We will provide you with detailed instructions on how to proceed." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Powflick will cover the shipping costs associated with returning the product." />
          </ListItem>
          <List>
            <ListItem>
              <ListItemText primary="• Modification or Reshipment: If possible, we will modify the original product or send you a new one, as quickly as possible to minimize any inconvenience." />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Replacement: If modification is not possible, we will send you a replacement product at no additional cost." />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="• Full or Partial Refund: If it is not possible to modify, reship, or replace the product, you will be refunded the total or partial amount of your investment, as appropriate to the specific case. The refund will be processed through the original payment method within a maximum period of 5 business days after we have received and verified the returned product at our facilities.
              Refunds will be credited to your bank account via the original payment method within 7-15 days after approval."
              />
            </ListItem>
          </List>
        </List>
        <Typography variant="h5" component="h2" gutterBottom>
          3. Unavailable Products:
        </Typography>
        <Typography paragraph>
          If, for any reason, a product you have ordered is no longer available
          or cannot be customized to your specifications, we will inform you
          immediately and offer you a full refund of the amount paid for that
          product.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Pricing Errors:
        </Typography>
        <Typography paragraph>
          While we strive to ensure the accuracy of the prices on our website,
          errors may occur. If we detect an error in the price of a product you
          have ordered, we will contact you as soon as possible. We will offer
          you the option of reconfirming your order at the correct price or
          canceling it. If we are unable to contact you, the order will be
          considered canceled and you will be refunded the full amount paid.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          5. Contact:
        </Typography>
        <Typography paragraph>
          If you have any questions or need assistance regarding this policy,
          please do not hesitate to contact us:
        </Typography>
        <Typography paragraph>
          Email: support@powflick.com
          <br />
          Phone: +86 15920110846
          <br />
          Response Time: Our goal is to respond to all inquiries within 24 hours
          (Monday through Friday).
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          6. Changes to this Policy:
        </Typography>
        <Typography paragraph>
          Powflick reserves the right to modify this Return & Refund Policy at
          any time. Any changes will be posted on this page, and you will be
          deemed to have accepted such changes if you continue to use our
          services after the posting.
        </Typography>
      </Box>
    </Container>
  );
};

export default page;
