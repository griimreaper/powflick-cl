import { Container, Typography, Box, Paper } from "@mui/material";
import { themeColors } from "theme/theme-colors";

const TermsPage = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                color: themeColors.grey[200],
                py: 4,
            }}
        >
            <Box component="header" mb={4}>
                <Typography variant="h3" component="h1" fontWeight="bold" mb={4} textAlign="center">
                    Terms & Conditions
                </Typography>
                <Typography variant="body2" mb={2}>
                    Please read these Terms and Conditions (the “Terms”) because they
                    govern your use of this website as well as the products and services
                    provided by Best Soccer Jersey and purchased by you.
                </Typography>
                <Typography variant="body2">
                    To make these Terms easier to read, the website, and the sale of our
                    products and services are collectively called the “Services”.
                    Furthermore, by using our Services and placing orders with Best
                    Soccer Jersey, you agree to be bound by the Terms to the fullest
                    extent permitted by applicable law (regardless of whether State,
                    Federal, Local, Regulatory, International, etc.).
                </Typography>
            </Box>

            {[
                {
                    title: "Changes to Terms and Conditions",
                    content: "We may modify our Terms at any time, in our sole discretion. Any modifications will be posted on our corporate website, or through other communications, as deemed appropriate."
                },
                {
                    title: "Pricing and Specification",
                    content: "We reserve the right to change prices due to increased costs, or to correct errors in pricing and/or specification. Suggested retail prices shown on our website are for reference only. No sales may have occurred at these prices. We will make every effort to send you only one invoice after all items on your order have shipped."
                },
                {
                    title: "Clearance/Sale Items",
                    content: "Any item marked as clearance or on sale is not considered for any refund/return unless the item is found to be defective within 60 days of purchase."
                },
                {
                    title: "Custom Orders",
                    content: "Custom orders require a customer signed order specification confirmation before any custom order is processed. If you decide to change a custom order after it has been placed, please contact us immediately. We will contact the manufacturing facility to determine if the order has already been processed or if the change can be made. If the order has been processed, we will not be able to change it and you will be responsible for paying for the order. If a change can be made, there may be a delay in delivery and/or an additional charge. Please be certain of your ordering needs prior to submission. We may require that you prepay for custom orders."
                },
                {
                    title: "Substitutions",
                    content: "We strive to continually improve our products to give you the best value possible. On occasion, we may ship you a product that differs slightly from the one pictured and described in our catalog. However, we will always substitute with a product of equal or better quality and value. If your requirements prohibit substitution, please let us know when you place the order."
                },
                {
                    title: "Off-Shore Destinations and APO/FPO Addresses",
                    content: "Sometimes the weight and size of items preclude postal shipment. Always provide alternative freight instructions and addresses (allowing us to ship other than by post), or with a domestic agent who can provide such information."
                },
                {
                    title: "Risk of Loss, Freight Damage and Shipment Shortages",
                    content: "Risk of loss, title and ownership of the goods purchased are transferred to the customer at the time goods are delivered to the common carrier. If a shipment is short or damaged, we will gladly assist you with your freight claim. The product shortage or damage must be noted on the freight delivery document. Please notify us immediately if you need assistance with your claim."
                }
            ].map((section, index) => (
                <Box key={index} component="section" mb={4}>
                    <Typography variant="h4" component="h2" fontWeight={600} mb={2}>
                        {section.title}
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        {section.content}
                    </Typography>
                </Box>
            ))}
        </Container>
    );
};

export default TermsPage;