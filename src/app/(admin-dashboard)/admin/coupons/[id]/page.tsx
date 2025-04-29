import { Metadata } from "next";
import CouponDetailsPageView from "pages-sections/vendor-dashboard/coupons/page-view/coupon-details-page";
import { getCouponById } from "services/dashboardAdmin/coupons";

export const metadata: Metadata = {
    title: "Coupon Details - Pow Flick",
    description: "Detalles del cupón y usuarios vinculados.",
    authors: [{ name: "devcodelab" }],
    keywords: ["e-commerce", "coupon", "admin", "next.js", "react"],
};

export default async function CouponDetails({ params }: any) {
    const couponData = await getCouponById(params.id);
    return <CouponDetailsPageView coupon={couponData} />;
} 
