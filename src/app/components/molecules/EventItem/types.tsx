export type EventT = {
  image: { url: string }[];
  openDateFrom: string;
  openDateTo: string;
  location: string;
  studio: string;
  openFor:
  | "Yanjuary"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December"
  | "Closed"
  | "Soon";
};
