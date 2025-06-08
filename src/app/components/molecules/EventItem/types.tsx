export type EventT = {
  image: { url: string }[];
  openDateFrom: string;
  openDateTo: string;
  location: string;
  studio: string;
  status: "open_with_date" | "open_without_date" | "closed" | "soon";
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
  | "December";
};
