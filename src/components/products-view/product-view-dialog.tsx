import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
// MUI ICON COMPONENTS
import Close from "@mui/icons-material/Close";
import SportZoneImage from "components/SportZoneImage";
import FlexBox from "components/flex-box/flex-box";
import { H2, H6, Paragraph } from "components/Typography";
// LOCAL CUSTOM HOOKS
// CUSTOM UTILS LIBRARY FUNCTION
import { ProductDB } from "models/types";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("components/carousel").then(m => m.Carousel), {
  ssr: false,
  loading: () => <p>Loading...</p> // Placeholder mientras carga
});
const Dialog = dynamic(() => import("@mui/material/Dialog"), {
  ssr: false,
  loading: () => <p>Loading...</p> // Placeholder mientras carga
});
// =====================================================
interface Props {
  product: ProductDB;
  openDialog: boolean;
  handleCloseDialog: () => void;
}
// =====================================================

export default function ProductViewDialog(props: Props) {
  const { product, openDialog, handleCloseDialog } = props;
  // const { handleCounterChange } = useCounter(product, false, true);

  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{ zIndex: 1501 }}
    >
      <DialogContent sx={{ maxWidth: 900, width: "100%" }}>
        <div>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel
                slidesToShow={1}
                arrowStyles={{
                  boxShadow: 0,
                  color: "primary.main",
                  backgroundColor: "transparent",
                }}
              >
                {product?.images?.map((item: string, index: number) => (
                  <SportZoneImage
                    key={index}
                    src={item}
                    alt="product"
                    sx={{
                      mx: "auto",
                      width: "100%",
                      objectFit: "contain",
                      height: { sm: 400, xs: 250 },
                    }}
                  />
                ))}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{product.title}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                CATEGORY: {product?.product_categories?.split("|").join(",")}
              </Paragraph>

              <H2 color="primary.main">{product.price}</H2>

              <FlexBox alignItems="center" gap={1} mt={1}>
                <Rating color="warn" value={4} readOnly />
                <H6 lineHeight="1">(50)</H6>
              </FlexBox>

              <Paragraph my={2}>
                {product.content}
              </Paragraph>

              <Divider sx={{ mb: 2 }} />
              <Button variant="contained" color="primary" href={"/products/" + product.slug}>
                Go to Product Page
              </Button>

              {/* {!cartItem?.customizations.length ? (
                <Button
                  size="large"
                  color="dark"
                  variant="contained"
                  onClick={() => handleCounterChange(1, true)}
                  sx={{ height: 45, borderRadius: 2 }}
                >
                  Add to Cart
                </Button>
              ) : (
                <FlexBox alignItems="center">
                  <Button
                    size="small"
                    color="dark"
                    variant="outlined"
                    sx={{ p: ".6rem", height: 45 }}
                    onClick={() =>handleCounterChange(- 1, true)}
                  >
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.customizations.length.toString().padStart(2, "0")}
                  </H3>

                  <Button
                    size="small"
                    color="dark"
                    variant="outlined"
                    sx={{ p: ".6rem", height: 45 }}
                    onClick={() => handleCounterChange(1, true)}
                  >
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>
              )} */}
            </Grid>
          </Grid>
        </div>

        <IconButton
          sx={{ position: "absolute", top: 3, right: 3 }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
