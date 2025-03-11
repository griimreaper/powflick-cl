import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!;

export const init = () => {
  if (!PIXEL_ID) return;
  ReactPixel.init(PIXEL_ID);
  ReactPixel.pageView();
};

export const viewItem = (event: string, data?: object) => {
  if (!PIXEL_ID) return;
  ReactPixel.track(event, data);
};
export const addToCart = (event: string, data?: object) => {
  if (!PIXEL_ID) return;
  ReactPixel.track(event, data);
};

export const beginCheckout = (event: string, data?: object) => {
  if (!PIXEL_ID) return;
  ReactPixel.track(event, data);
};
export const goToStripe = (event: string, data?: object) => {
  if (!PIXEL_ID) return;
  ReactPixel.track(event, data);
};
export const purchase = (event: string, data?: object) => {
  if (!PIXEL_ID) return;
  ReactPixel.track(event, data);
};

export const trackCustom = (event: string, data?: object) => {
  if (!PIXEL_ID) return;
  ReactPixel.trackCustom(event, data);
};
