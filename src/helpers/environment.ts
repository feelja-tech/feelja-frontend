export const apiDomain =
  process.env.NODE_ENV === "development"
    ? "192.168.1.4:4443"
    : "api.feelja.com";

export const apiUrl = `https://${apiDomain}/api`;

export const microblinkLicense = process.env.NEXT_PUBLIC_MICROBLINK_LICENSE;
