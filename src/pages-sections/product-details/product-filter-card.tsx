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
import { ProductDB } from "models/types";
import { themeColors } from "theme/theme-colors";
import { useRouter, useSearchParams } from "next/navigation";

const OTHERS = [
  { label: "On Sale", value: "discount" },
  // { label: "In Stock", value: "stock" },
  { label: "Featured", value: "featured" },
];

interface Props {
  filters: ProductFilters;
  changeFilters?: (key: ProductFilterKeys, values: ProductFilterValues) => void;
  topCategories?: any[];
  colors: string[];
  products?: ProductDB[];
}

const initialFilters = {
  brand: [],
  color: [],
  sales: [],
  price: [0, 300],
  rating: 0,
  category: [],
  search: undefined,
  collection: [],
};

export default function ProductFilterCard({
  filters,
  changeFilters,
  topCategories,
  colors,
}: Props) {
  const [collapsed, setCollapsed] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Función para actualizar los filtros en la URL
  const updateURL = (key: ProductFilterKeys, value: ProductFilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(",")); // Convierte array a string separada por comas
    } else if (typeof value === "string" || typeof value === "number") {
      params.set(key, String(value));
    } else {
      params.delete(key); // Elimina el parámetro si está vacío o es undefined
    }

    router.push(`?${params.toString()}`, { scroll: false }); // Actualiza la URL sin recargar la página
  };

  const handleChangePrice = (values: number[]) => {
    changeFilters && changeFilters("price", values);
  };
  const handleChangeColor = (value: string) => updateURL("color", [[value.split('')[0].toUpperCase() + value.slice(1)].join("")]);
  const handleChangeCategory = (value: string) => updateURL("category", [value]);
  const handleChangeSubCategory = (value: string) => updateURL("collection", [value]);

  const handleResetFilters = () => {
    router.push("?", { scroll: false }); // Reinicia los filtros a su estado inicial
  };


  const isValidColor = (color: string) => {
    if (typeof window === "undefined") return false; // No se puede validar en el servidor

    const s = new Option().style;
    s.color = color.toLowerCase(); // Normaliza el color
    return s.color !== ""; // Devuelve true si el navegador reconoce el color
  };

  const validColors = colors?.map(c => c.trim().toLowerCase())
    .filter(isValidColor);

  // const handleChangeBrand = (value: string) => {
  //   const values = filters.brand?.includes(value)
  //     ? filters.brand?.filter((item) => item !== value)
  //     : [...(filters.brand || []), value];

  //   changeFilters && changeFilters("brand", values);
  // };

  const handleChangeSales = (value: string, isChecked: boolean) => {
    if (value === "featured") {
      // Si es "featured", usa undefined al desactivar
      changeFilters && changeFilters("featured", isChecked ? true : undefined);
    } else if (value === "discount") {
      // Si es "sale", usa undefined al desactivar
      changeFilters && changeFilters("discount", isChecked ? true : undefined);
    } else {
      // Si no coincide con ninguno de los casos, sigue manejando como "sales"
      const values = isChecked
        ? [...(filters.sales || []), value] // Agrega el valor si está activado
        : filters.sales?.filter((item) => item !== value); // Remueve el valor si está desactivado
      changeFilters && changeFilters("sales", values?.length ? values : undefined);
    }
  };


  const handleChangeRating = (value: number) => {
    updateURL("rating", value);
  };


  const toggleCollapse = (categoryId: string) => {
    setCollapsed((prev) => (prev === categoryId ? null : categoryId));
  };

  console.log(filters);


  return (
    <div>
      {/* ACTIVE FILTERS */}
      <H6 mb={1.25} color={themeColors.text.primary}>Active Filters</H6>
      {topCategories?.map((item) => (
        <Fragment key={item.title}>
          <AccordionHeader
            open={collapsed === item.title}
            onClick={() => {
              toggleCollapse(item.title);
              handleChangeCategory(item.title);
            }}
            sx={{
              padding: ".5rem 0",
              cursor: "pointer",
            }}
          >
            <Span color={themeColors.text.secondary}>{item.title}</Span>
          </AccordionHeader>
          <Collapse in={collapsed === item.title}>
            {item.child?.map((subItem: any) => (
              <Paragraph
                pl="22px"
                py={0.75}
                key={subItem.title}
                fontSize="14px"
                sx={{ cursor: "pointer" }}
                onClick={() => handleChangeSubCategory(subItem.title)}
                color={themeColors.text.primary}
              >
                {subItem.title}
              </Paragraph>
            ))}
          </Collapse>
        </Fragment>
      ))}
      <Box component={Divider} my={3} />
      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
      <H6 mb={2} color={themeColors.text.primary}>Price Range</H6>
      <Slider
        min={0}
        max={300}
        size="small"
        value={filters.price || [0, 0]}
        valueLabelDisplay="auto"
        color="primary"
        valueLabelFormat={(v) => `$${v}`}
        onChange={(_, v) => handleChangePrice(v as number[])}
      />
      <FlexBetween>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="0"
          color="primary"
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
          color="primary"
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
            checked={filters[value as keyof ProductFilters] || false} // Verifica si está activo
            onChange={(e) => handleChangeSales(value, e.target.checked)}
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
      <H6 mb={2} color={themeColors.text.primary}>Colors</H6>
      <FlexBox mb={2} flexWrap="wrap" gap={1.5}>
        {validColors.map((item: string) => (
          <Box
            key={item}
            width={25}
            height={25}
            flexShrink={0}
            bgcolor={
              item === 'orange' ? 'orangered' :
                item
            }
            borderRadius="50%"
            border={1}
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
