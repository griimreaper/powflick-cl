import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
import StockOutProducts from "../stock-out-products";

// DATA TYPES
import { Card, RecentPurchased, StockOut } from "../types";

export default async function DashboardPageView() {
  const cardList: Card[] = [
    { id: 1, title: "Ventas", color: "blue", amount1: "5000", amount2: 4500, percentage: "10", status: "up" },
    { id: 2, title: "Pedidos", color: "green", amount1: "300", amount2: 250, percentage: "20", status: "up" },
  ];
  const stockOutProducts: StockOut[] = [
    { amount: 1, product: "Producto A", stock: "0" },
    { amount: 2, product: "Producto B", stock: "0" },
  ];
  const recentPurchase: RecentPurchased[] = [
    { id: "1", product: "Producto X", amount: 2, payment: "Tarjeta" },
    { id: "2", product: "Producto Y", amount: 1, payment: "Efectivo" },
  ];

  return (
    <div className="pt-2 py-2">
      <Grid container spacing={3}>
        {/* WELCOME CARD SECTION */}
        <Grid item md={6} xs={12}>
          <WelcomeCard />
        </Grid>

        {/* ALL TRACKING CARDS */}
        <Grid container item md={6} xs={12} spacing={3}>
          {cardList.map((item) => (
            <Grid item md={6} sm={6} xs={12} key={item.id}>
              <Card1
                title={item.title}
                color={item.color}
                amount1={item.amount1}
                amount2={item.amount2}
                percentage={item.percentage}
                status={item.status === "down" ? "down" : "up"}
              />
            </Grid>
          ))}
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
          <RecentPurchase data={recentPurchase} />
        </Grid>

        {/* STOCK OUT PRODUCTS */}
        <Grid item md={5} xs={12}>
          <StockOutProducts data={stockOutProducts} />
        </Grid>
      </Grid>
    </div>
  );
}
