import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const steps = [
  {
    id: 1,
    title: "Consultation",
    description: (
      <>
        Fill out the booking form — describe your tattoo idea, preferred
        placement, size, style, and the dates that work best for you. Please
        attach 1–3 references — it can be tattoos, sketches, or anything you
        like. This really helps me feel your idea.
        <br />
        <br />
        Once we confirm the details, I’ll share available dates and send over
        the rest of the info (address, deposit instructions, etc).
      </>
    ),
  },
  {
    id: 2,
    title: "Deposit",
    description: (
      <>
        To confirm your appointment, a $100 deposit is required. You can send it
        via e-transfer — the deposit is included in the total price.
        <br />
        <br />
        If you need to cancel or reschedule, just let me know at least 72 hours
        in advance, and we’ll figure it out individually.
        <br />
        <br />
        Otherwise, the deposit is non-refundable.
      </>
    ),
  },
  {
    id: 3,
    title: "Drawing Design",
    description: (
      <>
        Design preparation is free. Usually, I create a few design options 1 day
        before the session. I’ll send them as Photoshop mockups, so you can see
        how the tattoo might look on your body in real life.
        <br />
        <br />
        Don’t worry — we’ll go over everything together and adjust it until it
        feels just yours.
      </>
    ),
  },
  {
    id: 4,
    title: "Day of Session",
    description: (
      <>
        Bring a good mood, a favorite snack, lunch, water, or a book — whatever
        helps you feel comfortable during the session :)
      </>
    ),
  },
];

export function AppointmentTabsUI() {
  return (
    <TabGroup as="div">
      <TabList className="flex space-x-4 border-b border-gray-200">
        {steps.map((step) => (
          <Tab
            key={step.id}
            className={({ selected }) =>
              `py-2 px-4 text-sm font-medium ${selected
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
              }`
            }
          >
            <div className="text-sm uppercase tracking-wide text-gray-400">
              Step {step.id}
            </div>

            <div className="mt-1 font-sans font-bold uppercase">
              {step.title}
            </div>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {steps.map((step) => (
          <TabPanel key={step.id} className="p-4">
            <div className="mt-4 text-sm text-gray-600 leading-relaxed">
              {step.description}
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
