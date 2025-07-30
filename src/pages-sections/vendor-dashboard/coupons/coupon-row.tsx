import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Edit, Delete } from "@mui/icons-material";
import { showSuccessAlert, showErrorAlert } from "utils/alerts";
import { useDashboardStore } from "store/dashboard";
import { deleteCoupon } from "services/dashboardAdmin/coupons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// ========================================================================
type Props = { coupon: any; setActualize: Function };
// ========================================================================

export default function CouponRow({ coupon, setActualize, onClick }: any) {
    const { id, title, content, discountDisplay, expiresAt } = coupon || {};
    const { profile } = useDashboardStore();

    const router = useRouter();
    const handleNavigate = () => router.push(`/admin/coupons/${id}`);

    dayjs.extend(utc);
    dayjs.extend(timezone);

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
        <StyledTableRow tabIndex={-1} role="checkbox" onClick={handleNavigate} sx={{
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'rgba(202, 11, 11, 0.1)',
            },
        }}>
            <StyledTableCell align="left">{title}</StyledTableCell>
            <StyledTableCell align="left">{content}</StyledTableCell>
            <StyledTableCell align="center">{discountDisplay}</StyledTableCell>
            <StyledTableCell align="left">
                {expiresAt ? (() => {
                    const zone = coupon.timezone || 'UTC';
                    const localTime = dayjs.utc(expiresAt).tz(zone).format('DD/MM/YYYY HH:mm');
                    const cityName = zone.split('/').pop()?.replace(/_/g, ' ') || zone;
                    return `${cityName} - ${localTime}`;
                })() : 'Sin fecha'}
            </StyledTableCell>
            <StyledTableCell align="left">
                {expiresAt
                    ? new Intl.DateTimeFormat('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // ← formato 24hs
                    }).format(new Date(expiresAt))
                    : 'Sin fecha'}
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton onClick={(e) => {
                    e.stopPropagation(); // para que no se dispare también el onClick del row
                    router.push(`/admin/coupons/${id}?edit=true`);
                }}
                >
                    <Edit />
                </StyledIconButton>
                <StyledIconButton>
                    <Delete onClick={() => handleDelete(id)} />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
}
