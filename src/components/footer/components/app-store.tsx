import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENT
import FlexBox from "../../flex-box/flex-box";
// CUSTOM ICON COMPONENTS
import { PLAY_APP_STORE_DATA } from "../data";
import Link from "next/link";

export default function AppStore() {
  return (
    <FlexBox flexWrap="wrap" justifyContent="center" my={2}>
      {PLAY_APP_STORE_DATA.map(({ icon: Icon, subtitle, title, url }) => (
        <Link href={url} key={title} target="_blank" rel="noreferrer noopener" draggable={false}>
          <Box
            m={1}
            gap={1}
            p="10px 16px"
            color="white"
            display="flex"
            bgcolor="#161d2b"
            borderRadius="5px"
            alignItems="center">
            <Icon />

            <div>
              <Box fontSize="8px" fontWeight="600" lineHeight="1">
                {subtitle}
              </Box>

              <Box fontSize="14px" fontWeight="700">
                {title}
              </Box>
            </div>
          </Box>
        </Link>
      ))}
    </FlexBox>
  );
}
