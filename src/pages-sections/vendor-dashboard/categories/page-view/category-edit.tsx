"use client";

// LOCAL CUSTOM COMPONENT
import CategoryForm from "../category-form";
import PageWrapper from "../../page-wrapper";
import { Category } from "models/types";

export default function EditCategoryPageView({ category, availableProducts }: { category: Category, availableProducts: string[] }) {
  return (
    <PageWrapper title="Edit Category">
      <CategoryForm category={category} availableProducts={availableProducts}/>
    </PageWrapper>
  );
}
