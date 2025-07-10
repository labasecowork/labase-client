import { SpaceCard } from "../space_card";

const clients = [
  {
    id: "12345",
    spaceName: "Espacio 1",
    spaceImageUrl:
      "https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg",
    people: 2,
    price: "S/15.00",
    dateReservation: "25 de diciembre del 2025",
    timeReservation: "09:00 - 10:00",
  },
];

export const ListCard = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {clients.map((client) => (
        <SpaceCard
          key={client.id}
          id={client.id}
          spaceName={client.spaceName}
          spaceImageUrl={client.spaceImageUrl}
          people={client.people}
          price={client.price}
          dateReservation={client.dateReservation}
          timeReservation={client.timeReservation}
        />
      ))}
    </ul>
  );
};
