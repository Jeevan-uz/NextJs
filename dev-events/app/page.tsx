import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExpolreBtn";
import { Event, IEvent } from "@/database";
import { cacheLife } from "next/cache";

import connectDB from "@/lib/mongodb";

const Page = async () => {
  "use cache";
  cacheLife("hours");

  // 1. Connect to the database
  await connectDB;

  // 2. Fetch the events directly from MongoDB
  const rawEvents = await Event.find().sort({ createdAt: -1 }).lean();

  // 3. Convert Mongoose ObjectIds into plain text strings.
  // This does exactly what `response.json()` used to do and prevents Next.js errors!
  const events = JSON.parse(JSON.stringify(rawEvents));

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Cant Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in one Place
      </p>
      <ExploreBtn />

      <div className="mt-20 spcae-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
