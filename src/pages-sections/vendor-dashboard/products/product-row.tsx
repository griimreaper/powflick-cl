import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import SportZoneSwitch from "components/SportZoneSwitch";
import { Paragraph, Small } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import { ProductDB } from "models/types";
import { deleteProduct, updateProduct } from "services/dashboardAdmin/products";
import { useDashboardStore } from "store/dashboard";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import Link from "next/link";
import { Box } from "@mui/material";

// ========================================================================
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  category: string;
  published: boolean;
}

type Props = { product: ProductDB | any, setActualize: Function };
// ========================================================================

export default function ProductRow({ product, setActualize }: Props) {
  const { title, price, URL, product_categories, id, status, slug, sport, collections } =
    product || {};
  const { profile } = useDashboardStore();
  const router = useRouter();
  const [productPublish, setProductPublish] = useState<boolean>(status === 'publish' ? true : false);

  const handlePublish = async (boolean: boolean) => {
    try {
      setProductPublish(boolean)
      if (profile.token) {
        await updateProduct(id, { status: boolean ? 'publish' : 'draft' }, profile.token);
        showSuccessAlert('Success', 'The product has been actualized.')
      }
    } catch (error) {
      showErrorAlert('Error', 'Has an error to update product')
      setProductPublish(!boolean)
    }
  }

  const deleteProd = async (id: string) => {
    try {
      const response = await deleteProduct(id, profile.token as string);
      showSuccessAlert('Success', response.message)
      setActualize();
    } catch (error) {
      showErrorAlert('Failed', 'Product cannot be deleted,')
    }
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <Link href={'/products/' + slug}>
          <FlexBox alignItems="center" gap={1.5}>
            <Avatar alt={title} src={URL} sx={{ borderRadius: 2 }} />
            <Box>
              <Paragraph fontWeight={600} whiteSpace={'nowrap'}>{title}</Paragraph>
              <Small color="grey.600">#{id.split("-")[0] + ' / ' + slug}</Small>
            </Box>
          </FlexBox>
        </Link>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper whiteSpace={'nowrap'}>{product_categories.split('|')[0]}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper whiteSpace={'nowrap'}>{collections[0]?.title || 'None'}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">
        <SportZoneSwitch
          checked={productPublish}
          onChange={() => handlePublish(!productPublish)}
        />
      </StyledTableCell>

      <StyledTableCell align="center" sx={{
        whiteSpace: "nowrap", // Evita el wrapping
        gap: 1, // Espaciado entre botones
      }}>
        <StyledIconButton
          onClick={() => router.push(`/admin/products/${id}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <Delete
            onClick={() => deleteProd(id)}
          />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
