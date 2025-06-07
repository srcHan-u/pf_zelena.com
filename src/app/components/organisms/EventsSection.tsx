import { Heading } from "@components/atoms/Heading";
import { EventT } from "@components/molecules/EventItem/types";
import { EventItem } from "../molecules/EventItem/EventItem";

type Props = {
  items: EventT[];
};

export function EventsSection({ items = [] }: Props) {
  return (
    <section
      id="events"
      className="py-[80px]
       md:py-[100px]
       lg:pt-[128px] lg:pb-[133px]
       xl:pt-[148px] xl:pb-[153px]"
    >
      <div className="container">
        <Heading text={"Bookings / events"} />
        <div className="mt-[65px] flex flex-wrap justify-between gap-[28px]">
          {items.map((event, index) => (
            <EventItem key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
