// LOCAL CUSTOM COMPONENT
"use client";
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import ProductPanel from "../product-panel";
import useFlag from "hooks/useFlag";
import { Button, Modal, Box } from "@mui/material";

interface Props {
  collectionsList: string[];
  categoriesList: string[];
}

export default function ProductCreatePageView({
  collectionsList,
  categoriesList,
}: Props) {
  const [openPanel, setOpenPanel] = useFlag();
  return (
    <PageWrapper title="Add New Product">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenPanel(true)}
        >
          Add products
        </Button>
      </div>
      <Modal
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        aria-labelledby="add-products-modal"
        aria-describedby="add-products-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '80%',
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <ProductPanel openPanel={openPanel} setOpenPanel={setOpenPanel} />
        </Box>
      </Modal>
      <ProductForm
        collectionsList={collectionsList}
        categoriesList={categoriesList}
      />
    </PageWrapper>
  );
}
