import Airtable from "airtable";
import { Header } from "@components/molecules/Header";
import { HeroSection } from "@components/organisms/HeroSection";
import { AboutSection } from "@components/organisms/AboutSection";
import { AppointmentSection } from "@components/organisms/AppointmentSection";
import { PortfolioSection } from "@components/organisms/PortfolioSection";
import { EventsSection } from "@components/organisms/EventsSection";
import { FAQSection } from "@components/organisms/FAQSection/FAQSection";
import {
  ContactsSection,
  ContactItem,
} from "@components/organisms/ContactsSection";
import { FlashDesignsSection } from "@components/organisms/FlashDesignsSection";
import { ModalInitializer } from "./context/ModalInitializer";
import type { PortfolioCardT } from "@components/molecules/PortfolioCard/types";
import type { EventT } from "@components/molecules/EventItem/types";

export const revalidate = 60; // Revalidate every 60 seconds

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(
  process.env.AIRTABLE_BASE_ID!
);

function formatDateRange(from?: string, to?: string): string {
  if (!from && !to) return "Bookings open";
  const fmt = (d?: string) => d?.split("-").slice(1).reverse().join("/") ?? "";
  return `${fmt(from)} – ${fmt(to)}`;
}

export default async function Home() {
  const [portfolio, events, contacts, flashDesigns] = await Promise.all(
    ["PortfolioTable", "Events", "Contacts", "FlashDesigns"].map((table) =>
      base(table)
        .select({ view: "Grid view" })
        .all()
        .then((recs) => recs.map((r) => r.fields))
    )
  );

  const allEvents = events as Array<Record<string, unknown>>;

  const openEvents = allEvents.filter(({ status }) =>
    ["open_with_date", "open_without_date"].includes(
      (status as string).toLowerCase()
    )
  );

  const selectCityOptions = openEvents.map(({ location, studio }) => ({
    value: `${location}, ${studio}`,
    label: `${location}, ${studio}`,
  }));

  const heroEvents = openEvents.map(
    ({ location, studio, openDateFrom, openDateTo }) => ({
      location: `${location}, ${studio}`,
      date: formatDateRange(openDateFrom as string, openDateTo as string),
    })
  );

  const lastContact = (contacts as ContactItem[]).at(-1)!;

  return (
    <div className="flex flex-col min-h-screen">
      <ModalInitializer options={{ selectOptions: selectCityOptions }} />
      <Header />
      <main className="flex-grow">
        <HeroSection events={heroEvents} />
        <AboutSection />
        <AppointmentSection />
        <PortfolioSection items={portfolio as unknown as PortfolioCardT[]} />
        <FlashDesignsSection items={flashDesigns} />
        <EventsSection items={allEvents as EventT[]} />
        <FAQSection />
        <ContactsSection item={lastContact} />
      </main>
    </div>
  );
}
