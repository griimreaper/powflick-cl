import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import Sales from "../sales";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
// DATA TYPES

export default async function DashboardPageView() {

  return (
    <div className="pt-2 py-2">
      <Grid container spacing={3}>
        {/* WELCOME CARD SECTION */}
        <Grid item md={6} xs={12}>
          <WelcomeCard />
        </Grid>

        {/* ALL TRACKING CARDS */}
        <Grid container item md={6} xs={12} spacing={3}>
        </Grid>

        {/* SALES AREA */}
        <Grid item xs={12}>
          <Sales />
        </Grid>

        {/* ANALYTICS AREA */}
        <Grid item xs={12}>
          <Analytics />
        </Grid>

        {/* RECENT PURCHASE AREA */}
        <Grid item md={7} xs={12}>
        </Grid>

        {/* STOCK OUT PRODUCTS */}
        <Grid item md={5} xs={12}>
        </Grid>
      </Grid>
    </div>
  );
}
