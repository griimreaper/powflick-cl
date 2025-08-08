import { Container, Typography, Box, List } from "@mui/material";
import { themeColors } from "theme/theme-colors";

const PrivacyPage = () => {
    const sections = [
        {
            title: "What We Collect",
            content: [
                {
                    subtitle: "Information You Give Us",
                    text: "We may collect Personal Information you choose to provide to us...",
                },
                {
                    subtitle: "Information Automatically Collected",
                    text: "We may use a third-party Service Provider (defined below)...",
                },
                {
                    subtitle: "Cookies",
                    text: "We may log information using 'cookies.' Cookies are small data files...",
                },
                {
                    subtitle: "Web Beacons and Pixels",
                    text: "We may log information using digital images called Web beacons...",
                },
                {
                    subtitle: "Tracking Options and California Do Not Track Disclosures",
                    text: "You may adjust your browser or operating system settings...",
                },
            ],
        },
        {
            title: "Use of Information",
            content: [
                {
                    text: "We use the information that we have about you to provide, support...",
                },
                {
                    text: "We may use the Personal Information we collect from and about you to...",
                },
                {
                    text: "We may also use your information to contact you about our goods...",
                },
            ],
        },
        {
            title: "Sharing of Personal Information",
            content: [
                {
                    text: "We may disclose aggregated, anonymized, and/or non-identifying...",
                },
                {
                    text: "We will not disclose your Personal Information other than as...",
                },
                {
                    text: "We may share the Personal Information we collect from and about you...",
                },
                {
                    text: "We may sell or purchase assets during the normal course of our...",
                },
            ],
        },
        {
            title: "Service Providers",
            content: [
                {
                    text: "We may contract with third parties to perform functions related to...",
                },
                {
                    text: "However, certain third-party Service Providers, such as payment...",
                },
                {
                    text: "In particular, remember that certain providers may be located in...",
                },
                {
                    text: "As an example, if you are located in Canada and your transaction...",
                },
                {
                    text: "Once you leave Site or are redirected to a third-party website...",
                },
            ],
        },
        {
            title: "Information Choices and Changes",
            content: [
                {
                    text: "Our marketing emails tell you how to unsubscribe or 'opt-out.'...",
                },
            ],
        },
        {
            title: "Links to Other Sites",
            content: [
                {
                    text: "The Services may contain links to other third-party websites...",
                },
            ],
        },
        {
            title: "Our Commitment Towards Children’s Privacy",
            content: [
                {
                    text: "We do not direct the Services to, nor do we knowingly collect any...",
                },
                {
                    text: "Children under 13 are not eligible to use the Services. If we learn...",
                },
            ],
        },
        {
            title: "Security of Your Personal Information",
            content: [
                {
                    text: "We are committed to protecting the security of your Personal...",
                },
            ],
        },
        {
            title: "Payment",
            content: [
                {
                    text: "We use secure socket layer (SSL) technology to encrypt your...",
                },
                {
                    text: "When you make a payment, it is encrypted through the Payment Card...",
                },
                {
                    text: "All direct payment gateways adhere to the standards set by PCI-DSS...",
                },
                {
                    text: "PCI-DSS requirements help ensure the secure handling of credit card...",
                },
            ],
        },
        {
            title: "Privacy Notice to EU Users",
            content: [
                {
                    text: "If you are based within the European Union (EU), in certain...",
                },
            ],
            listItems: [
                "Right to access: the right to request certain information...",
                "Right to rectification: the right to have your Personal...",
                "Right to erasure/“right to be forgotten”: where the processing...",
                "Right to restriction of use of your information: the right to stop...",
                "Right to data portability: the right to request that we return...",
                "Right to object: the right to object to our use of your Personal...",
            ],
        },
        {
            title: "Legal Basis for Processing",
            content: [
                {
                    text: "The following legal bases apply to the ways in which we use and...",
                },
            ],
            listItems: [
                "We process Personal Information on the basis of our performance...",
                "We also process the information provided by an individual in our...",
            ],
        },
        {
            title: "Retention",
            content: [
                {
                    text: "We will retain the information you provide as long as you have...",
                },
                {
                    text: "Requests in relation to the above rights should be sent to...",
                },
            ],
        },
        {
            title: "Contact Information",
            content: [
                {
                    text: "We welcome your comments or questions about this Policy. You may...",
                },
            ],
        },
        {
            title: "Changes to Privacy Policy",
            content: [
                {
                    text: "We may modify this Policy from time to time. If we make any...",
                },
            ],
        },
    ];

    const renderContent = (content: { text?: string; subtitle?: string }[]) => {
        return content.map((item, index) => (
            <Box key={index} mb={2}>
                {item.subtitle && (
                    <Typography variant="h5" component="h3" fontWeight={600} mb={1}>
                        {item.subtitle}
                    </Typography>
                )}
                {item.text && (
                    <Typography variant="body2" component="div">
                        {item.text}
                    </Typography>
                )}
            </Box>
        ));
    };

    const renderList = (items: string[]) => (
        <List dense sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
            {items.map((item, index) => (
                <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    sx={{ display: 'list-item', mb: 1 }}
                >
                    {item}
                </Typography>
            ))}
        </List>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4, color: themeColors.grey[200] }}>
            <Box component="header" mb={4}>
                <Typography variant="h3" component="h1" fontWeight="bold" textAlign="center" mb={4}>
                    Privacy Policy
                </Typography>
                <Box component="section" mb={4}>
                    <Typography variant="body2" mb={2}>
                        This privacy policy (“Policy”) describes how our site collects,
                        uses, and shares personal information...
                    </Typography>
                    {/* Resto del contenido inicial */}
                </Box>
            </Box>

            {sections.map((section, index) => (
                <Box key={index} component="section" mb={4}>
                    <Typography variant="h4" component="h2" fontWeight={600} mb={2}>
                        {section.title}
                    </Typography>

                    {section.content && renderContent(section.content)}
                    {section.listItems && renderList(section.listItems)}
                </Box>
            ))}
        </Container>
    );
};

export default PrivacyPage;