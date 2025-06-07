import { Header } from "@components/molecules/Header";
import { HeroSection } from "@components/organisms/HeroSection";
import { AboutSection } from "@components/organisms/AboutSection";
import { AppointmentSection } from "@components/organisms/AppointmentSection";
import { PortfolioSection } from "@components/organisms/PortfolioSection";
import { EventsSection } from "@components/organisms/EventsSection";
import { FAQSection } from "@components/organisms/FAQSection";
import {
  ContactItem,
  ContactsSection,
} from "@components/organisms/ContactsSection";
import { FlashDesignsSection } from "@components/organisms/FlashDesignsSection";
import Airtable from "airtable";
import { PortfolioCardT } from "@components/molecules/PortfolioCard/types";
import { EventT } from "@components/molecules/EventItem/types";
import { ModalInitializer } from "./context/ModalInitializer";

const apiKey = process.env.AIRTABLE_API_KEY!;
const baseId = process.env.AIRTABLE_BASE_ID!;

const base = new Airtable({ apiKey }).base(baseId);

export const revalidate = 60;

function formatEvents(items: { location: string; date: string }[]) {
  function formatDate(input: string) {
    const [, month, day] = input.split("-");
    return `${day}/${month}`;
  }

  return items.map((event) => `${formatDate(event.date)}`).join(" - ");
}

export default async function Home() {
  const tables = ["PortfolioTable", "Events", "Contacts", "FlashDesigns"];
  const [portfolio, events, contacts, flashDesigns] = await Promise.all(
    tables.map(async (name) => {
      const recs = await base(name).select({ view: "Grid view" }).all();
      return recs.map((r) => ({ ...r.fields }));
    })
  );
  console.log("🚀 ~ Home ~ events:", events)

  const selectCityOptions = events
    .filter((e) => (e.openFor as string).toLowerCase() !== "closed")
    .map((e) => {
      return {
        value: `${e.location}, ${e.studio}`,
        label: `${e.location}, ${e.studio}`,
      };
    });

  const heroEvents = events
    .filter((e) => (e.openFor as string).toLowerCase() !== "closed")
    .map((e) => ({
      location: `${e.location}, ${e.studio}`,
      date: formatEvents([
        { location: e.location as string, date: e.openDateFrom as string },
        { location: e.location as string, date: e.openDateTo as string },
      ]),
    }));

  console.log("🚀 ~ Home ~ events:", heroEvents);

  return (
    <div className="flex flex-col min-h-screen">
      <ModalInitializer
        options={{
          selectOptions: selectCityOptions,
        }}
      />
      <Header />
      <main className="flex-grow">
        <HeroSection events={heroEvents} />
        <AboutSection />
        <AppointmentSection />
        <PortfolioSection items={portfolio as unknown as PortfolioCardT[]} />
        <FlashDesignsSection items={flashDesigns} />
        <EventsSection items={events as unknown as EventT[]} />
        <FAQSection />
        <ContactsSection
          item={contacts[contacts.length - 1] as unknown as ContactItem}
        />
      </main>
    </div>
  );
}
