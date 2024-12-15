export interface Hotel {
  id: string;
  name: string;
  rating: number;
  price_per_day: number;
  image: string;
  location: string;
  eventLabel?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  flight_price: number;
  image: string;
  label: string;
  hotels: Hotel[];
}
