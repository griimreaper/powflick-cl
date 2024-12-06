"use client";

import { Fragment, useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
// LOCAL CUSTOM COMPONENTS
import CheckboxLabel from "./checkbox-label";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/accordion-header";
// TYPE
import {
  ProductFilterKeys,
  ProductFilterValues,
  ProductFilters,
} from "./types";
import { Slider } from "@mui/material";

// FILTER OPTIONS
// Eliminar la constante categoryList
// const categoryList = [
//   {
//     title: "Bath Preparations",
//     subCategories: ["Bubble Bath", "Bath Capsules", "Others"],
//   },
//   { title: "Eye Makeup Preparations" },
//   { title: "Fragrance" },
//   { title: "Hair Preparations" },
// ];

// const BRANDS = [
//   { label: "Mac", value: "mac" },
//   { label: "Karts", value: "karts" },
//   { label: "Baals", value: "baals" },
//   { label: "Bukks", value: "bukks" },
//   { label: "Luasis", value: "luasis" },
// ];

const OTHERS = [
  { label: "On Sale", value: "sale" },
  { label: "In Stock", value: "stock" },
  { label: "Featured", value: "featured" },
];

const colorList = [
  "Black",
  "Yellow",
  "Red",
  "Orange",
  "Green",
  "Blue",
  "White",
];

const mockSubCategories: { [key: string]: string[] } = {
  "Custom Soccer Jerseys": ["SubCategory 1", "SubCategory 2"],
  "Custom Hockey Jerseys": ["SubCategory 3", "SubCategory 4"],
  "Custom Baseball Jerseys": ["SubCategory 5", "SubCategory 6"],
  "Running clothes": ["SubCategory 7", "SubCategory 8"],
  "Custom Basketball Jerseys": ["SubCategory 9", "SubCategory 10"],
  "Gamer Shirts": ["SubCategory 11", "SubCategory 12"],
  "New Arrivals": ["SubCategory 13", "SubCategory 14"],
};

// ============================================================================
interface Props {
  filters?: ProductFilters;
  changeFilters?: (key: ProductFilterKeys, values: ProductFilterValues) => void;
  topCategories?: { id: string; name: string; subCategories?: string[] }[];
}

const initialFilters = {
  brand: [],
  color: [],
  sales: [],
  price: [0, 300],
  rating: 0,
  category: [],
  search: undefined,
};

export default function ProductFilterCard({
  filters = initialFilters,
  changeFilters,
  topCategories,
}: Props) {
  const [collapsed, setCollapsed] = useState<string | null>(null);

  const handleChangePrice = (values: number[]) => {
    changeFilters && changeFilters("price", values);
  };

  const handleChangeColor = (value: string) => {
    changeFilters && changeFilters("color", [value]);
  };

  const handleChangeBrand = (value: string) => {
    const values = filters.brand?.includes(value)
      ? filters.brand?.filter((item) => item !== value)
      : [...(filters.brand || []), value];

    changeFilters && changeFilters("brand", values);
  };

  const handleChangeSales = (value: string) => {
    const values = filters.sales?.includes(value)
      ? filters.sales?.filter((item) => item !== value)
      : [...(filters.sales || []), value];

    changeFilters && changeFilters("sales", values);
  };

  const handleChangeRating = (value: number) => {
    changeFilters && changeFilters("rating", value);
  };

  const handleChangeCategory = (value: string) => {
    changeFilters && changeFilters("category", [value]);
  };

  const toggleCollapse = (categoryId: string) => {
    setCollapsed((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleResetFilters = () => {
    changeFilters && changeFilters("price", initialFilters.price);
    changeFilters && changeFilters("color", initialFilters.color);
    changeFilters && changeFilters("brand", initialFilters.brand);
    changeFilters && changeFilters("sales", initialFilters.sales);
    changeFilters && changeFilters("rating", initialFilters.rating);
    changeFilters && changeFilters("category", initialFilters.category);
    changeFilters && changeFilters("search", initialFilters.search);
  };

  return (
    <div>
      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>
      {topCategories?.map((item) => (
        <Fragment key={item.id}>
          <AccordionHeader
            open={collapsed === item.id}
            onClick={() => {
              toggleCollapse(item.id);
              handleChangeCategory(item.name);
            }}
            sx={{
              padding: ".5rem 0",
              cursor: "pointer",
              color: "grey.600",
            }}
          >
            <Span>{item.name}</Span>
          </AccordionHeader>
          <Collapse in={collapsed === item.id}>
            {(mockSubCategories[item.name] || []).map((name: string) => (
              <Paragraph
                pl="22px"
                py={0.75}
                key={name}
                fontSize="14px"
                color="grey.600"
                sx={{ cursor: "pointer" }}
                onClick={() => handleChangeCategory(name)}
              >
                {name}
              </Paragraph>
            ))}
          </Collapse>
        </Fragment>
      ))}
      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
      <H6 mb={2}>Price Range</H6>
      <Slider
        min={0}
        max={300}
        size="small"
        value={filters.price || [0, 0]}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `$${v}`}
        onChange={(_, v) => handleChangePrice(v as number[])}
      />
      <FlexBetween>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="0"
          value={filters.price?.[0] || 0}
          onChange={(e) =>
            handleChangePrice([+e.target.value, filters.price?.[1] || 0])
          }
        />
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="250"
          value={filters.price?.[1] || 0}
          onChange={(e) =>
            handleChangePrice([filters.price?.[0] || 0, +e.target.value])
          }
        />
      </FlexBetween>

      <Box component={Divider} my={3} />

      {/* BRAND VARIANT FILTER */}
      {/* <H6 mb={2}>Brands</H6>
      <FormGroup>
        {BRANDS.map(({ label, value }) => (
          <CheckboxLabel
            key={value}
            label={label}
            checked={filters.brand?.includes(value) || false}
            onChange={() => handleChangeBrand(value)}
          />
        ))}
      </FormGroup> */}

      <Box component={Divider} my={3} />

      {/* SALES OPTIONS */}
      <FormGroup>
        {OTHERS.map(({ label, value }) => (
          <CheckboxLabel
            key={value}
            label={label}
            checked={filters.sales?.includes(value) || false}
            onChange={() => handleChangeSales(value)}
          />
        ))}
      </FormGroup>

      <Box component={Divider} my={3} />

      {/* RATINGS FILTER */}
      {/* <H6 mb={2}>Ratings</H6>
      <FormGroup>
        {[5, 4, 3, 2, 1].map((item) => (
          <CheckboxLabel
            key={item}
            checked={filters.rating === item || false}
            onChange={() => handleChangeRating(item)}
            label={<Rating size="small" value={item} color="warn" readOnly />}
          />
        ))}
      </FormGroup> */}

      <Box component={Divider} my={3} />

      {/* COLORS VARIANT FILTER */}
      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1.5}>
        {colorList.map((item) => (
          <Box
            key={item}
            width={25}
            height={25}
            flexShrink={0}
            bgcolor={item}
            borderRadius="50%"
            onClick={() => handleChangeColor(item)}
            sx={{
              outlineOffset: 1,
              cursor: "pointer",
              outline: filters.color?.includes(item) ? 1 : 0,
              outlineColor: item,
            }}
          />
        ))}
      </FlexBox>
      <Box component={Divider} my={3} />
      <Box component={Divider} my={3} />
      <Button variant="outlined" onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
