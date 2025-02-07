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
                {/* <Typography variant="body2" mb={2}>
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
                </Typography> */}
            </Box>

            {[
                {
                    title: "1. GENERAL PROVISIONS",
                    content: `
<h5>1.1 Access and Acceptance</h5>
Any user who accesses Powflick’s website (www.powflick.com) expressly agrees to these General Conditions and to the Data Protection Policy in force at the time of browsing and placing orders.
<h5>1.2 Scope of Application</h5>
These General Conditions govern the sale of goods and the provision of services carried out exclusively through Powflick’s website, in accordance with the applicable provisions on consumer protection and e-commerce.
<h5>1.3 Legal Information of Powflick</h5>
Brand Name: Powflick
Operated by: Squidgy Brand Management (Foshan) Co., Ltd.
Physical Address: B15-280, Xia Nan Yi Heng Base Section, Guicheng Subdistrict,
Nanhai District, Foshan City, Guangdong Province, China
Postal Code: 528000
Tax ID Number: 91440605MAE5F5JC1T
Primary Email: powflick@gmail.com
Contact Phone: +86 15920110846
<h5>1.4 Mandatory Reading</h5>
Users are required to carefully read these General Conditions before accessing the products and services offered on the website. By making any purchase, users are deemed to have accepted these General Conditions fully and without reservation.
<h5>1.5 Modifications</h5>
Powflick reserves the right to unilaterally modify these General Conditions without prior notice. Users are advised to download or print a copy of the purchase form and these General Conditions for their records.`
                },
                {
                    title: "2. ORDER PROCESS AND PRODUCT CUSTOMIZATION",
                    content: `
<h5>2.1 Product Selection</h5>
The customer must choose the type of uniform they wish to customize.
<h5>2.2 Design Customization</h5>
Size and Gender
The customer selects the sizes (e.g., XS to 3XL) and genders (men, women, children).
Customizable Elements
Logos
The customer must upload their own logos in vector format (SVG, AI, EPS, PDF).
If no vector file is available, the logo must be sent in the highest possible resolution (300 dpi).
The customer is responsible for ensuring that images are of good quality, with a minimum size of 400×400 px and a minimum file size of 300 KB.
Logos may also be sent by email to support@powflick.com.
Powflick does not guarantee optimal print quality if low-resolution images are provided.
Texts and Numbers
The customer may add names, slogans, or numbers to the front and back of the uniform.
<h5>Materials</h5>
The customer will select from the predefined material mockups available for each type of sport.
Powflick offers a default material at no additional cost, plus two other options at +$2.99 each.
<h5>Additional Cost</h5>
Each customization variable (logos, text, numbers, material selection) has an associated additional cost:
+$4.99 per logo
+$3.99 per additional text or number
+$2.99 if choosing a material different from the default
<h5>2.3 Preview</h5>
The customer can access a design preview under the “list” option found beneath each customization, by clicking the “View” button. A PDF file will be generated, summarizing all customizations.
<h5>2.4 Add to Cart</h5>
Once satisfied with the design, the customer adds the uniform to their shopping cart.
<h5>2.5 Summary and Confirmation</h5>
The customer can view the costs of each customization throughout the process. Before confirming the order, the customer reviews the summary. After the purchase, they receive PDF files with details of the customization via email.
<h5>2.6 Order Cancellation</h5>
The customer has a 2-hour window after placing the order to cancel without any fees. If cancellation is requested after 2 hours, 10% of the total order value will be withheld for management costs. The customer must contact support@powflick.com to request cancellation.
<h5>2.7 Product Availability</h5>
If a product is no longer available or cannot be customized, Powflick will inform the customer and proceed with a refund of the amount paid.`
                },
                {
                    title: "3. PRICES, PAYMENTS, AND TRANSACTIONS",
                    content: `
<h5>3.1 Product and Service Prices</h5>
The prices of products and services will be those indicated on the website, except in cases of obvious error. In the event of a pricing error, Powflick will notify the customer as soon as possible, allowing them to confirm the order at the correct price or cancel it. Powflick is not obliged to supply a product at a lower price if it was incorrectly listed. The listed prices do not include taxes corresponding to the customer’s country, which are calculated based on the shipping location (particularly in the United States).
<h5>3.2 Payment Methods</h5>
Powflick accepts credit card payments (Visa, Mastercard, Maestro, American Express) and through payment gateways such as Stripe.
<h5>3.3 Discounts and Promotions</h5>
Occasionally, Powflick may offer promotional discounts via codes that the customer can apply at checkout.
<h5>3.4 Additional Costs</h5>
Powflick does not apply additional handling or customization fees beyond those indicated by the customer when selecting each uniform variable.
<h5>3.5 Transaction Security</h5>
All transactions on Powflick’s website are encrypted to protect the customer’s sensitive data. Powflick works with recognized payment gateways to ensure the protection of financial information. Powflick does not store transaction information about its customers.`
                },
                {
                    title: "4. BRAND, IMAGE, AND PROMOTION RIGHTS",
                    content: `
<h5>4.1 Placement of Logos and Labels</h5>
Powflick reserves the right to include its own logo on products, as shown in the sample designs. The customer agrees that Powflick’s logo is positioned so that it does not interfere with the customer’s logos and respects the overall aesthetic of the design.
<h5>4.2 Use of Products and Information</h5>
Powflick reserves the right to use any communication from the customer (including images and comments) for marketing and promotional purposes. This includes displaying products on the website, in catalogs, and on social media. By using these services, the customer agrees that Powflick may edit, copy, publish, distribute, and use shared content with no obligation of confidentiality, compensation, or response. Powflick is not responsible for any content uploaded or shared by the customer or third parties.
<h5>4.3 Customers as References</h5>
Powflick may use its customers as references, mentioning their names, logos, or images for advertising or promotional purposes. The customer may limit or prohibit the use of their information by notifying Powflick in writing.`
                },
                {
                    title: "5. ACCEPTABLE USE OF CONTENT AND INTELLECTUAL PROPERTY",
                    content: `
<h5>5.1 Customer Liability for Content</h5>
The customer declares and guarantees that they are the legitimate owner or hold the necessary usage rights over any image, text, logo, brand, or other element they provide to Powflick for product customization.
By uploading or submitting content, the customer confirms compliance with applicable intellectual property laws and commits to not infringe the rights of third parties.
<h5>5.2 Prohibited Content and Review</h5>
Powflick reserves the right to refuse, review, or remove any order containing content that, in its sole discretion, is considered a violation of intellectual property rights, fundamental rights, or any content that is offensive, illegal, etc.
<h5>5.3 Use of Trademarks</h5>
If the customer uses a trademark, they declare they have the express authorization of the rightful owner. The customer assumes full responsibility and expressly exonerates Powflick from any claim or dispute arising from the unauthorized use of said trademark.
<h5>5.4 Disclaimer</h5>
Powflick assumes no liability for legal, financial, or any other consequences resulting from unauthorized use or infringement of third-party rights by the customer. The customer agrees to indemnify and hold Powflick harmless from any claim, demand, loss, damage, expense, or cost arising from the improper use of the content provided. The customer will be solely responsible for any seizure or confiscation of products resulting from copyright infringement or any other applicable law.`
                },
                {
                    title: "6. EVENTS BEYOND OUR CONTROL",
                    content: `Powflick will not be liable for any breach or delay in fulfilling its contractual obligations caused by events outside its reasonable control ("Events Beyond Our Control"), such as natural disasters, wars, or any other similar cause. In the event of Events Beyond Our Control, Powflick will make all reasonable efforts to mitigate the effects and resume its obligations as soon as possible.`
                },
                {
                    title: "7. INTELLECTUAL PROPERTY OF POWFLICK’S WEBSITE AND CONTENT",
                    content: `All content included or made available through Powflick’s website (text, graphics, logos, images, videos, audio, software, source code, etc.) is the exclusive property of Powflick or its licensors, and is protected by applicable intellectual property laws. Any unauthorized use of the site’s content is strictly prohibited without prior written consent from Powflick.`
                },
                {
                    title: "8. SEVERABILITY",
                    content: `If any provision of these Terms and Conditions is declared invalid, illegal, or unenforceable by a competent authority, that provision will be deemed severable and will not affect the validity of the remaining provisions. The invalid provision will be replaced by one that complies with the law and closely reflects the original intention of the parties.`
                },
                {
                    title: "9. ASSIGNMENT",
                    content: `Powflick may assign, transfer, or delegate any of its rights or obligations under these Terms and Conditions to a third party without requiring the customer’s prior consent. The customer may not assign, transfer, or delegate their rights or obligations without Powflick’s prior written consent.`
                },
                {
                    title: "10. PRODUCTION PROCESS",
                    content: `
<h5>10.1 Definition</h5>
“Production” refers to the period from placing the order to the point at which products are handed over to the carrier for shipment. Shipping time is not included in this period.
<h5>10.2 Start of the Process</h5>
Production will not begin until all outstanding payments (if any) have been paid in full.
<h5>10.3 Modifications</h5>
Once an order enters the production phase, it cannot be modified.
<h5>10.4 Design and Color Confirmation</h5>
Approximately 8 days after placing the order, Powflick will send the customer a fabric sample of the logos, names, and numbers for one of the uniforms in the order, via email and WhatsApp.
The customer will have 24 hours to respond and confirm or request changes. If no response is received, the sample is considered accepted.
<h5>10.5 Delivery Times</h5>
Powflick provides an approximate delivery date. The customer acknowledges that this is an estimation unless an EXPRESS service with a mandatory delivery timeframe is contracted.`
                },
                {
                    title: "11. DELIVERY TIMES",
                    content: `
<h5>11.1 Estimated Nature of Timeframes</h5>
Delivery times provided by Powflick are estimates, not guarantees.
<h5>11.2 Approximate Production Times</h5>
The production time for a custom order is typically around 30 days. The customer can check the status of the order via the customer portal.
<h5>11.3 Production Process (Summary)</h5>
Processing: Checking the files. Production Queue: Waiting times vary. Printing: The design is printed and transferred onto fabric. Tailoring: Pieces are sewn. Review: Final inspection before shipping.
<h5>11.4 Shipping (Transit) Times</h5>
Once production is finished, shipping times vary by country (e.g., 10–20 business days for US/EU/MX).
<h5>11.5 Express Shipping</h5>
An Express Shipping option is available for an additional $20, reducing delivery times to ~15 days in most cases.
<h5>11.6 Customs Duties</h5>
For international shipments, customs duties and taxes may apply, which are the customer’s responsibility.`
                },
                {
                    title: "12. RETURNS AND CLAIMS",
                    content: `
<h5>12.1 Customized Products</h5>
Powflick offers made-to-measure, customized products; no returns are allowed unless otherwise stated here.
<h5>12.2 Claims for Defects or Obvious Errors</h5>
Powflick will be liable for manufacturing defects that render the product unusable, or serious errors in customization.
<h5>12.3 Claims Procedure</h5>
The customer must contact Powflick within 7 business days of receiving the product, providing a description and photos.
<h5>12.4 Conditions for Accepting Claims</h5>
The customer must provide clear, detailed photographic evidence. Claims can be rejected if caused by misuse or if errors are minor.
<h5>12.5 Return Shipping Costs</h5>
If Powflick accepts a return due to a defect or obvious error, it will cover return shipping and replacement costs.`
                },
                {
                    title: "Last Update: 25/02/2022",
                    content: `Official Website: www.powflick.com`
                }
            ].map((section, index) => (
                <Box key={index} component="section" mb={4}>
                    <Typography variant="h4" component="h2" fontWeight={600} mb={2}>
                        {section.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        mb={2}
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                </Box>
            ))}
        </Container>
    );
};

export default TermsPage;