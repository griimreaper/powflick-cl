"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
// MUI ICON COMPONENTS
import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { Paragraph, Span } from "components/Typography";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
// STYLED COMPONENTS
import { MainContainer, StyledNavLink } from "./styles";
import { LockRounded } from "@mui/icons-material";
import { Profile } from "models/types";
import { signOut } from "next-auth/react";
import { useDashboardStore } from "store/dashboard";

export default function Navigation({ profile }: { profile: Profile }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const { removeProfile } = useDashboardStore()
  const MENUS = [
    {
      title: "DASHBOARD",
      list: [
        {
          href: "/dashboard/orders",
          title: "Orders",
          Icon: ShoppingBagOutlined,
          count: profile?.genericResponseUser?.orders?.length,
        },
        {
          href: "/dashboard/wish-list",
          title: "Wishlist",
          Icon: FavoriteBorder,
          count: profile?.favorites?.length
        },
        {
          href: "/dashboard/support-tickets",
          title: "Support Tickets",
          Icon: CustomerService,

        }
      ]
    },
    {
      title: "ACCOUNT SETTINGS",
      list: [
        {
          href: "/dashboard/profile",
          title: "Profile Info",
          Icon: Person
        },
        {
          href: "/dashboard/address",
          title: "Addresses",
          Icon: Place,
          count: profile?.genericResponseUser?.directions?.length
        },
        {
          href: "/login",
          title: "Sign Out",
          Icon: LockRounded,
        }
      ]
    }
  ];

  return (
    <MainContainer>
      {MENUS.map((item) => (
        <Fragment key={item.title}>
          <Paragraph p="26px 30px 1rem" color="grey.600" fontSize={12}>
            {item.title}
          </Paragraph>

          {item.list.map(({ Icon, count, href, title }) => (
            <StyledNavLink href={href === '/login' ? '/' : href} key={title} isCurrentPath={pathname.includes(href)}
              onClick={() => {
                if (href === '/login') {
                  signOut({redirect: false}),
                  removeProfile()
                }
              }}
            >
              <FlexBox alignItems="center" gap={1}>
                <Icon color="inherit" fontSize="small" className="nav-icon" />
                <Span>{title}</Span>
              </FlexBox>

              <Span>{count}</Span>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
}
