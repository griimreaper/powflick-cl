import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Edit, Delete } from "@mui/icons-material";
import { showSuccessAlert, showErrorAlert } from "utils/alerts";
import { useDashboardStore } from "store/dashboard";
import { deleteCoupon } from "services/dashboardAdmin/coupons";
import { useRouter } from "next/navigation";

// ========================================================================
type Props = { coupon: any; setActualize: Function };
// ========================================================================

export default function CouponRow({ coupon, setActualize, onClick }: any) {
    const { id, title, content, discountDisplay } = coupon || {};
    const { profile } = useDashboardStore();

    const router = useRouter();
    const handleNavigate = () => router.push(`/admin/coupons/${id}`);

    const handleDelete = async (id: string) => {
        try {
            await deleteCoupon(id, profile.token as string);
            showSuccessAlert('Success', 'Coupon deleted successfully');
            setActualize((prev: boolean) => !prev);
        } catch (error) {
            showErrorAlert('Failed', 'Coupon cannot be deleted');
        }
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox" onClick={onClick} style={{ cursor: "pointer" }}>
            <StyledTableCell align="left">{title}</StyledTableCell>
            <StyledTableCell align="left">{content}</StyledTableCell>
            <StyledTableCell align="center">{discountDisplay}</StyledTableCell>
            <StyledTableCell align="center">
                <StyledIconButton onClick={handleNavigate}>
                    <Edit />
                </StyledIconButton>
                <StyledIconButton>
                    <Delete onClick={() => handleDelete(id)} />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
}
