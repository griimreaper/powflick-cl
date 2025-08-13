import { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  SelectChangeEvent,
  IconButton,
  Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Paragraph } from "components/Typography";
import { CloudUpload, Delete } from "@mui/icons-material";
import PhoneInput from 'react-phone-input-2';
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { createFreeDesign } from "services/FreeDesign";
import { uploadFolderPath } from "services/dashboardAdmin/products";
import ColorWheelPicker from "./WheelColor";

interface ContactInfo {
  fullName: string;
  email: string;
  organization: string;
  phone: string;
}

interface FormData {
  teamName: string;
  sport: string;
  color: string;
  description: string;
  date: Date | null;
  primaryColors: string[];
  secondaryColors: string[];
  font: string;
  addNames: boolean;
  addNumbers: boolean;
  logos: any[];         // Cambiar 'any' por un tipo más específico si lo sabés
  otherImages: any[];   // Igual que arriba
  contactInfo: ContactInfo;
}

const sports = [
  "Soccer",
  "Hockey",
  "Baseball",
  "Running",
  "Basketball",
  "Gaming",
];

export const colors = [
  { hex: "#000000", name: "Black" },
  { hex: "#FF0000", name: "Red" },
  { hex: "#FFFF00", name: "Yellow" },
  { hex: "#00FF00", name: "Lime" },
  { hex: "#0000FF", name: "Blue" },
  { hex: "#FF00FF", name: "Magenta" },
  { hex: "#8B0000", name: "Dark Red" },
  { hex: "#FFA500", name: "Orange" },
  { hex: "#BDB76B", name: "Dark Khaki" },
  { hex: "#9ACD32", name: "Yellow Green" },
  { hex: "#008000", name: "Green" },
  { hex: "#006400", name: "Dark Green" },
  { hex: "#3CB371", name: "Medium Sea Green" },
  { hex: "#20B2AA", name: "Light Sea Green" },
  { hex: "#4682B4", name: "Steel Blue" },
  { hex: "#191970", name: "Midnight Blue" },
  { hex: "#4B0082", name: "Indigo" },
  { hex: "#800080", name: "Purple" },
  { hex: "#8B008B", name: "Dark Magenta" },
  { hex: "#D2B48C", name: "Tan" },
  { hex: "#A9A9A9", name: "Dark Gray" },
  { hex: "#696969", name: "Dim Gray" },
  { hex: "#8B4513", name: "Saddle Brown" },
  { hex: "#A52A2A", name: "Brown" },
  { hex: "#D2691E", name: "Chocolate" },
  { hex: "#654321", name: "Dark Brown" }
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

const LogoUpload = ({ onChange }: { onChange: any }) => {
  const t = useTranslations('YourDesignForm');
  const [logos, setLogos] = useState<File[]>([]);
  const [logoPreviews, setLogoPreviews] = useState<string[]>([]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      const updatedFiles = [...logos, ...newFiles];
      const updatedPreviews = [...logoPreviews, ...newPreviews];

      setLogos(updatedFiles);
      setLogoPreviews(updatedPreviews);

      onChange(updatedFiles); // ✅ actualizamos al padre con todos los logos
    }
  };

  const removeLogo = (index: number) => {
    // liberar memoria
    URL.revokeObjectURL(logoPreviews[index]);

    const updatedFiles = logos.filter((_, i) => i !== index);
    const updatedPreviews = logoPreviews.filter((_, i) => i !== index);

    setLogos(updatedFiles);
    setLogoPreviews(updatedPreviews);

    onChange(updatedFiles); // ✅ actualizamos al padre tras eliminar
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          align="left"
          sx={{
            display: "flex",
            gap: 1,
            fontStyle: "italic",
            fontWeight: "800",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {t('uploadLogosTitle')}
          <Paragraph>
            {t('uploadLogosOptional')}
          </Paragraph>
        </Typography>
        <FormHelperText>
          {t('uploadLogosHelper')}
        </FormHelperText>
      </Box>
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />} // Aquí se agrega el ícono
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          fontSize: '1.2rem', // Aumenta el tamaño del texto
          padding: '10px 20px', // Ajusta el padding para un tamaño más grande
          width: '100%', // Hace que el botón sea de ancho completo
          height: "150px", // Ajusta la altura del botón
        }}
      >
        {t('uploadLogosButton')}
        <input
          type="file"
          hidden
          multiple
          onChange={handleLogoUpload}
        />

      </Button>
      {logos.length > 0 && (
        <Box display={"flex"} flexDirection="row">
          {logos.map((file, index) => (
            <Box key={index} display="flex" position={'relative'} alignItems="center" mb={1}>
              <img
                src={URL.createObjectURL(file)}
                alt={`logo-${index}`}
                width={100}
                height={"auto"}
                style={{ objectFit: "contain", borderRadius: 8 }}
              />
              <IconButton
                onClick={() => removeLogo(index)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "white",
                  '&:hover': { bgcolor: "grey.200" }
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const OtherImagesUpload = ({ onChange }: { onChange: any }) => {
  const t = useTranslations('YourDesignForm');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      const updatedFiles = [...files, ...newFiles];
      const updatedPreviews = [...previews, ...newPreviews];

      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onChange(updatedFiles); // ✅ ahora se envían todos los archivos
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];

    // liberar memoria del preview
    URL.revokeObjectURL(previews[index]);

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    onChange(updatedFiles); // ✅ avisamos al padre del nuevo array
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          align="left"
          sx={{
            display: "flex",
            gap: 1,
            fontStyle: "italic",
            fontWeight: "800",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {t('otherImagesTitle')}
          <Typography component="span" fontStyle="normal" fontWeight="400">{t('uploadLogosOptional')}</Typography>
        </Typography>
        <FormHelperText>
          {t('otherImagesHelper')}
        </FormHelperText>
      </Box>

      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: '1.2rem',
          padding: '10px 20px',
          width: '100%',
          height: "150px",
          textAlign: "center",
        }}
      >
        {t('otherImagesButton')}
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleChange}
        />
      </Button>

      {previews.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {previews.map((src, index) => (
            <Box key={index} position="relative">
              <img
                src={src}
                alt={`other-${index}`}
                width={100}
                height={100}
                style={{ objectFit: "contain", borderRadius: 8 }}
              />
              <IconButton
                onClick={() => removeImage(index)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "white",
                  '&:hover': { bgcolor: "grey.200" }
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const ContactInfoForm = ({ values, onChange }: any) => {
  const t = useTranslations('YourDesignForm');
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontStyle: "italic", fontWeight: "800" }}
      >
        {t('contactInfo')}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="fullName"
            label={t('fullName')}
            value={values.fullName}
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="email"
            label={t('email')}
            type="email"
            value={values.email}
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            name="organization"
            label={t('organization')}
            value={values.organization}
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth>
            <PhoneInput
              country={'us'}
              value={values.phone}
              onChange={(phone) => onChange({ target: { name: 'phone', value: phone } })}
              inputStyle={{ width: '100%' }}
              inputProps={{
                required: true,
                name: 'phone',
              }}
            />
          </FormControl>

        </Grid>
      </Grid>
    </Box>
  );
};

export default function RequestForm() {
  const t = useTranslations('YourDesignForm');
  const [showColorPickerPrimary, setShowColorPickerPrimary] = useState(false);
  const [showColorPickerSecondary, setShowColorPickerSecondary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    sport: '',
    color: '',
    description: '',
    date: null,
    primaryColors: [],
    secondaryColors: [],
    addNames: false,
    addNumbers: false,
    font: 'Arial',
    logos: [],
    otherImages: [],
    contactInfo: {
      fullName: '',
      email: '',
      organization: '',
      phone: '',
    },
  });

  const handleLogoChange = (files: File[]) => {
    setFormData((prevState: any) => ({
      ...prevState,
      logos: files,
    }));
  };

  const handleOtherImagesChange = (files: File[]) => {
    setFormData((prevState: any) => ({
      ...prevState,
      otherImages: files,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValuesChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value,
      },
    }));
  };

  const handleDateChange = (newDate: any) => {
    setFormData((prev: any) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handlePrimaryColorsChange = (event: string[]) => {
    setFormData((prev: any) => ({ ...prev, primaryColors: event }));
  };

  const handleSecondaryColorsChange = (event: string[]) => {
    setFormData((prev: any) => ({ ...prev, secondaryColors: event }));
  };
  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!formData.primaryColors || formData.primaryColors.length === 0) {
        colorPickerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      const logosUrl = await uploadFolderPath(data.logos, 'free-design/' + data.teamName + '/' + data.contactInfo.email)
      const otherImagesUrl = await uploadFolderPath(data.otherImages, 'free-design/' + data.teamName + '/' + data.contactInfo.email)

      const response = await createFreeDesign({ ...data, otherImages: otherImagesUrl, logos: logosUrl, ...data.contactInfo });

      showSuccessAlert(response.message, data.contactInfo.email);
    } catch (error) {
      console.error("Error creating design:", error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      showErrorAlert("Error creating design", "Please try again later.");
    }
  };

  return (
    <form id="design-section" onSubmit={(e) => { e.preventDefault(), onSubmit(formData) }}>
      <Container maxWidth="md" sx={{ py: 10 }}>
        <FormControl fullWidth margin="normal" required>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            mb={10}
            sx={{
              fontStyle: "italic",
              fontWeight: "bold",
              fontFamily: "GYMER",
              color: "primary.main",
            }}
          >
            {t('title')}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{
              fontStyle: "italic",
              fontWeight: "800",
              display: "flex",
              gap: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {t('needBy')}
            <Typography
              variant="h6"
              fontWeight="800"
              color={"primary.main"}
            > *
            </Typography>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={formData.date}
              minDate={new Date()}
              onChange={handleDateChange}
              sx={{ mb: 2, width: "100%", borderRadius: 2 }}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{
              fontStyle: "italic",
              fontWeight: "800",
              display: "flex",
              gap: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {t('teamName')}
            <Typography
              variant="h6"
              fontWeight="800"
              color={"primary.main"}
            > *
            </Typography>
          </Typography>
          <TextField
            fullWidth
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            sx={{ borderRadius: 2 }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ mb: 4 }} required>
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            mb={2}
            sx={{
              fontStyle: "italic",
              fontWeight: "800",
              display: "flex",
              gap: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {t('selectSport')}
            <Typography
              variant="h6"
              fontWeight="800"
              color={"primary.main"}
            > *
            </Typography>
          </Typography>

          <Select
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
            sx={{ borderRadius: 2 }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              {t('selectPlaceholder')}
            </MenuItem>
            {sports.map((sport) => (
              <MenuItem key={sport} value={sport}>
                {t(`sports.${sport}` as any)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required error={submitted && (!formData.primaryColors || formData.primaryColors.length === 0)} ref={colorPickerRef}>
          {/* Botón para abrir el Color Wheel Picker */}
          <Button onClick={() => setShowColorPickerPrimary(!showColorPickerPrimary)} variant="outlined" fullWidth>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, width: "100%" }}>
              <Typography variant="h6" component="span" fontWeight="bold" display={"flex"} gap={1} fontStyle={"italic"} width={'100%'} >
                {t('primaryColors')}
                <Typography variant="h6" fontWeight="800" color={"primary.main"}> *</Typography>
              </Typography>
              <Box display={'flex'}>
                {formData.primaryColors?.map((color) => {
                  return (
                    <Box
                      key={color}
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: color,
                        borderRadius: 1,
                        border: '1px solid #ccc',
                        marginLeft: 1,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Button>

          {/* Si se debe mostrar el Color Picker, renderízalo */}
          {showColorPickerPrimary && (
            <Box sx={{ display: 'flex', my: 3, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <ColorWheelPicker
                colors={formData.primaryColors}
                onColorChange={handlePrimaryColorsChange}
              />
            </Box>
          )}

          <FormHelperText>
            {submitted && (!formData.primaryColors || formData.primaryColors.length === 0)
              ? t('primaryColorsError')
              : t('primaryColorsHelper')}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          {/* Botón para abrir el Color Wheel Picker */}
          <Button onClick={() => setShowColorPickerSecondary(!showColorPickerSecondary)} variant="outlined" fullWidth>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, width: "100%" }}>
              <Typography variant="h6" component="span" fontWeight="bold" display={"flex"} gap={1} fontStyle={"italic"} width={'100%'} >
                {t('secondaryColors')}
              </Typography>
              <Box display={'flex'}>
                {formData.secondaryColors?.map((color) => {
                  return (
                    <Box
                      key={color}
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: color,
                        borderRadius: 1,
                        border: '1px solid #ccc',
                        marginLeft: 1,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Button>

          {/* Si se debe mostrar el Color Picker, renderízalo */}
          {showColorPickerSecondary && (
            <Box sx={{ display: 'flex', my: 3, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <ColorWheelPicker
                colors={formData.secondaryColors}
                onColorChange={handleSecondaryColorsChange}
              />
            </Box>
          )}

          <FormHelperText>
            {t('secondaryColorsHelper')}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={
          { display: "flex", alignItems: "left", p: { xs: 2, md: 4 }, border: "0.5px solid gray", borderRadius: 2, my: 4 }
        }>
          <Typography
            gutterBottom
            align="left"
            mb={2}
            sx={{
              display: "flex",
              gap: 1,
              fontStyle: "italic",
              fontWeight: "800",
              fontSize: { md: "0.9rem" },
              textAlign: { xs: "left", md: "left" },
            }}
          >
            {t('namesNumbersQuestion')}
            <Paragraph>{t('optional')}</Paragraph>
          </Typography>
          <FormGroup sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="addNames"
                  checked={formData.addNames}
                  onChange={handleCheckboxChange}
                />
              }
              label={t('includeNames')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="addNumbers"
                  checked={formData.addNumbers}
                  onChange={handleCheckboxChange}
                />
              }
              label={t('includeNumbers')}
            />
          </FormGroup>

          {/* <Typography
            gutterBottom
            align="left"
            mb={2}
            sx={{
              display: "flex",
              gap: 1,
              fontStyle: "italic",
              fontWeight: "800",
              fontSize: { md: "0.9rem" },
            }}
          >
            Names/Numbers Font Style
            <Paragraph>(optional)</Paragraph>
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
            }}
          >
            {Object.entries(fonts).map(([name, font]) => (
              <Box
                key={name}
                onClick={() => setFormData((prev) => ({ ...prev, font: font }))}
                sx={{
                  minWidth: 150,
                  flex: "0 0 auto",
                  border: formData.font === font ? "2px solid #ca0b0b" : "1px solid #ccc",
                  borderRadius: 2,
                  padding: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  fontFamily: font,
                  transition: "0.2s",
                  "&:hover": {
                    borderColor: "#ca0b0b",
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: font }}>{name}</Typography>
                <Typography variant="h6" sx={{ fontFamily: font }}>1234567890</Typography>
              </Box>
            ))}
          </Box> */}
        </FormControl>

        <LogoUpload onChange={handleLogoChange} />
        <OtherImagesUpload onChange={handleOtherImagesChange} />

        <Box sx={{ mb: 4 }}>

          <Typography
            variant="h6"
            gutterBottom
            align="left"
            display={'flex'}
            gap={1}
            sx={{ fontStyle: "italic", fontWeight: "800" }}
          >
            {t('description')}
            <Typography
              variant="h6"
              fontWeight={"800"}
              color={"primary.main"}>
              *
            </Typography>
          </Typography>
          <FormHelperText>
            {t('descriptionHelper')}
          </FormHelperText>

          <TextField
            fullWidth
            multiline
            rows={10}
            placeholder={t('descriptionPlaceholder')}
            name="description"
            margin="normal"
            value={formData.description}
            onChange={handleChange}
            required
            sx={{ border: "0.5px solid", borderRadius: 2 }}
          />
        </Box>

        <ContactInfoForm values={formData.contactInfo} onChange={handleValuesChange} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSubmitted(true)}
            sx={{
              fontSize: {
                xs: "0.5rem",
                sm: "1.0rem",
                md: "1.0rem",
                lg: "1.5rem",
                xl: "2rem",
              },
              padding: { xs: "8px 16px", sm: "8px 16px", md: "8px 16px" },
              marginTop: 4,
              display: { xs: "block" },
              marginLeft: { xs: "auto", md: 0 },
              marginRight: { xs: "auto", md: 0 },
            }}
            type="submit"
          >
            {t('submit')}
          </Button>
        </Box>
      </Container >
    </form >
  );
}
