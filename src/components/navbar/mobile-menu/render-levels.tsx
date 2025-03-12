import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMore from "@mui/icons-material/ExpandMore";
// GLOBAL CUSTOM COMPONENTS
import { H6 } from "components/Typography";
import { SubCategoryList } from "../category-based-menu/styles";
import ProductCard8 from "components/product-cards/product-card-8";

const ACCORDION_STYLES = {
  background: "#1A1A1A",
  "&:not(:last-child)": { borderBottom: 0 },
  "&:before": { display: "none" },
};

const ACCORDION_SUMMARY_STYLES = {
  padding: 0,
  minHeight: 48,
  color: "#FEFCFC",
  background: "#1A1A1A",
  boxShadow: "none",
  "& .Mui-expanded": { color: "primary.main", margin: 0 },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    margin: 0,
    "& .MuiSvgIcon-root": { color: "primary.main" },
  },
};

export const renderLevels = (data: any[], handleClose: () => void) => {
  return data.map((item: any, index: number) => {
    if (item.child) {
      return (
        <Accordion square key={index} elevation={0} disableGutters sx={ACCORDION_STYLES}>
          <AccordionSummary expandIcon={<ExpandMore color="primary" />} sx={ACCORDION_SUMMARY_STYLES}>
            <H6>{item.title}</H6>
          </AccordionSummary>

          <Box mx={2} sx={{ background: '#1A1A1A' }}>{renderLevels(item.child, handleClose)}</Box>
        </Accordion >
      );
    }

    if (item.products) {
      return (
        <Accordion square key={index} elevation={0} disableGutters sx={ACCORDION_STYLES}>
          <AccordionSummary expandIcon={<ExpandMore color="primary" />} sx={ACCORDION_SUMMARY_STYLES}>
            <H6>{item.title}</H6>
          </AccordionSummary>

          <Box sx={{ display: 'flex', overflowX: 'scroll', alignItems: 'center', gap: 2 }}
            mx={2}>{renderLevels(item.products, handleClose)}</Box>
        </Accordion>
      );
    }

    return (
      <div key={item.title}>
        <SubCategoryList>
          <Box key={item.id} width={200}>
            <ProductCard8 key={item.id} product={item}></ProductCard8>
          </Box>
        </SubCategoryList>
      </div>
    );
  });
};
