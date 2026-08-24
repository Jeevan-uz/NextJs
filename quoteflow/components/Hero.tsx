import { events } from "@/lib/constants";
import Card from "./Card";

const Hero = () => {
  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event.title}>
            <Card {...event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;
