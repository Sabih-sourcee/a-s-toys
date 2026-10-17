/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_ORDER_FORM_ID?: string;
  readonly VITE_CONTACT_FORM_ID?: string;
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_SHOP_PHONE?: string;
  readonly VITE_SHOP_EMAIL?: string;
  readonly VITE_SHOP_ADDRESS?: string;
  readonly VITE_EXCHANGE_POLICY?: string;
  readonly VITE_DELIVERY_CHARGES?: string;
  readonly VITE_COURIER?: string;
  readonly VITE_FREE_SHIPPING_OVER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
