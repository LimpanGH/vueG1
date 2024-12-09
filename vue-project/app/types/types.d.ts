interface Hotel {
  name: string;
  rating: number;
  price_per_day: number;
  image: string;
}

interface Event {
  hotels?: Hotel[];
  id: string;
  label: string;
  title: string;
  flight_price: number;
  date: string;
  description: string;
  location: string;
  image: string;
}

interface State {
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  meal_plan: "none" | "breakfast" | "half_board" | "all_inclusive";
  cancellation_protection: boolean;
  name: string;
  email: string;
  flight_back_and_forth: boolean;
}
