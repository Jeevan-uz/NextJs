export type EventItems = {
  slug: string;
  title: string;
  price: string;
  image: string;
};

export const events: EventItems[] = [
  {
    slug: "barber-shop",
    title: "Barber Shop",
    price: "$200",
    image: "/images/event1.png",
  },
  {
    slug: "xerox-shop",
    title: "Xerox Shop",
    price: "$100",
    image: "/images/event2.png",
  },
  {
    slug: "plumber-shop",
    title: "Plumber Shop",
    price: "$250",
    image: "/images/event3.png",
  },
];
