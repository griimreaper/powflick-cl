"use client";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { Autocomplete } from "@mui/material";
import { Influencer } from "models/types";
import { useDashboardStore } from "store/dashboard";
import { useRouter } from "next/navigation";
import { showErrorAlert, showSuccessAlert } from "utils/alerts";
import { createInfluencer, updateInfluencer } from "services/Influencers";
import { useState } from "react";
import { setImageBlob } from "services/imageStorage";
import { H2 } from "components/Typography";
import InfluencerStore from "./InfluencerStore";

// ======================= VALIDATION ========================
const socialMediaSchema = yup.object({
  label: yup.string().nullable(),
  url: yup.string().nullable().url("Must be a valid URL"),
}).test(
  "label-url-required",
  "Both label and URL must be provided or neither.",
  (value) => {
    const hasLabel = !!value?.label;
    const hasUrl = !!value?.url;
    return (hasLabel && hasUrl) || (!hasLabel && !hasUrl);
  }
);

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email").required("Email is required!"),
  label: yup.string().required("Label is required!"),
  title: yup.string().required("Title is required!"),
  description: yup.string().required("Description is required!"),
  products: yup.array().of(yup.string()),
  socialMedia: yup.object({
    instagram: socialMediaSchema,
    twitter: socialMediaSchema,
    facebook: socialMediaSchema,
    tiktok: socialMediaSchema,
    youtube: socialMediaSchema,
  }),
});

// ========================= PROPS ===========================
interface Props {
  influencer?: Influencer;
  availableProducts: { title: string, image: string, price: string }[];
}

type SocialMediaKey = 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube';

type SocialMedia = {
  [key in SocialMediaKey]?: {
    label: string;
    url: string;
  };
};

interface InfluencerFormValues {
  name: string;
  email: string;
  label: string;
  title: string;
  description: string;
  logo: string;
  banner: string;
  profileImage: string;
  socialMedia: SocialMedia;
  products: string[]
}

// ========================= COMPONENT =======================
export default function InfluencersForm({ influencer, availableProducts }: Props) {
  const { profile } = useDashboardStore();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(influencer?.logo || "");
  const [bannerPreview, setBannerPreview] = useState(influencer?.banner || "");
  const [profileImagePreview, setProfileImagePreview] = useState(influencer?.profileImage || "");
  const router = useRouter();
  const {
    id,
    name,
    email,
    label,
    logo,
    banner,
    products,
  } = influencer || {};

  const INITIAL_VALUES: InfluencerFormValues = {
    name: name || "",
    email: email || "",
    label: label || "",
    title: influencer?.title || "",
    description: influencer?.description || "",
    logo: logo || "",
    banner: banner || "",
    profileImage: influencer?.profileImage || "",
    socialMedia: influencer?.socialMedia || {
      instagram: { label: "", url: "" },
      twitter: { label: "", url: "" },
      facebook: { label: "", url: "" },
      tiktok: { label: "", url: "" },
      youtube: { label: "", url: "" },
    },

    products: products?.map((p) => p.title) || [],
  };

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    try {
      if (!logoPreview) {
        showErrorAlert("Missing Logo", "Logo is required");
        return;
      }

      if (!bannerPreview) {
        showErrorAlert("Missing Banner", "Banner is required");
        return;
      }

      let logoUrl: any = logoPreview;
      let bannerUrl: any = bannerPreview;
      let profileImageUrl: any = profileImagePreview;

      if (profileImageFile) {
        profileImageUrl = await setImageBlob(profileImageFile, "influencer/" + values.label);
      }

      if (logoFile) {
        logoUrl = await setImageBlob(logoFile, "influencer/" + values.label);
      }

      if (bannerFile) {
        bannerUrl = await setImageBlob(bannerFile, "influencer/" + values.label);
      }

      const influencerPayload = {
        ...values,
        logo: logoUrl.secure_url,
        banner: bannerUrl.secure_url,
        profileImage: profileImageUrl.secure_url,
      };

      console.log(influencerPayload);

      const response = influencer
        ? await updateInfluencer(id!, influencerPayload, profile.token!)
        : await createInfluencer(influencerPayload, profile.token!);

      showSuccessAlert("Success", response.message);
      if (!influencer) {
        router.push("/admin/influencers/" + response.id);
      } else {
        router.replace(window.location.pathname);
      }
    } catch (error: any) {
      console.error(error);
      showErrorAlert("Failed", error?.response?.data?.message || "Unexpected error");
    }
  };

  const socials = ["youtube", "instagram", "tiktok", "twitter", "facebook"] as const;
  type SocialKey = typeof socials[number]; // "youtube" | "instagram" | "tiktok" | "twitter" | "facebook"

  return (
    <Card className="p-3">
      <Formik<InfluencerFormValues>
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="label"
                  label="Label"
                  value={values.label}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.label && errors.label)}
                  helperText={touched.label && errors.label}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>

              <Grid container spacing={2} item xs={12}>

                {socials.map((social: SocialKey) => {
                  const touchedSocial = touched.socialMedia?.[social] as { label?: boolean; url?: boolean } | undefined;
                  const errorSocial = errors.socialMedia?.[social] as { label?: string; url?: string } | string | undefined;

                  const errorLabel = typeof errorSocial === "object" ? errorSocial?.label : errorSocial;
                  const errorUrl = typeof errorSocial === "object" ? errorSocial?.url : errorSocial;

                  return (
                    <Grid item xs={12} key={social}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            label={`${social.charAt(0).toUpperCase() + social.slice(1)} Label`}
                            name={`socialMedia.${social}.label`}
                            value={values.socialMedia?.[social]?.label || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touchedSocial?.label && errorLabel)}
                            helperText={touchedSocial?.label && errorLabel}
                          />
                        </Grid>

                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            label={`${social.charAt(0).toUpperCase() + social.slice(1)} URL`}
                            name={`socialMedia.${social}.url`}
                            value={values.socialMedia?.[social]?.url || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touchedSocial?.url && errorUrl)}
                            helperText={touchedSocial?.url && errorUrl}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}

              </Grid>

              <Grid item xs={6}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Profile Image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileImageFile(file);
                        setProfileImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Logo
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setLogoFile(file);
                        setLogoPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Banner
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setBannerFile(file);
                        setBannerPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>


              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="products"
                  options={availableProducts.map((p) => p.title)}
                  getOptionLabel={(option) => option}
                  value={values.products}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: { name: "products", value: newValue },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Products"
                      placeholder="Search products"
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              </Grid>

              <H2 my={2} ml={3}>Preview</H2>
              <Grid item xs={12} textAlign={'center'} >
                <InfluencerStore
                  values={values}
                  logoPreview={logoPreview}
                  bannerPreview={bannerPreview}
                  profileImage={profileImagePreview}
                  products={availableProducts?.filter((p: any, i) => values.products.find((selectedProducts) => selectedProducts === p.title))}
                />
              </Grid>


              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  {influencer ? "Update Influencer" : "Create Influencer"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
