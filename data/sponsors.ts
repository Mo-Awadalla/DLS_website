/**
 * Sponsor logos supplied by the organizers. Names are the full display names.
 */

export interface Sponsor {
  id: string;
  name: string;
  /** Public path to the logo. */
  logo: string;
  /** Intrinsic pixel size of the logo file, used to reserve layout space. */
  logoWidth: number;
  logoHeight: number;
}

export const sponsors: readonly Sponsor[] = [
  {
    id: "nysba",
    name: "New York State Bar Association",
    logo: "/assets/sponsors/nysba.png",
    logoWidth: 579,
    logoHeight: 100,
  },
  {
    id: "acia",
    name: "The Academy for Critical Incident Analysis at John Jay College",
    logo: "/assets/sponsors/acia.jpg",
    logoWidth: 4072,
    logoHeight: 1040,
  },
  {
    id: "nyc-law-department",
    name: "New York City Law Department",
    logo: "/assets/sponsors/nyc-law-department.png",
    logoWidth: 339,
    logoHeight: 100,
  },
];
