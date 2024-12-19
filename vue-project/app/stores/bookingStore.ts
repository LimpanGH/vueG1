import { defineStore } from "pinia";
// import LoadingBooking from '~/components/loading-booking.vue'

interface BookingDetails {
  id: string;
  userId: number;
  eventId: string;
  eventTitle: string;
  status: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  mealPlan: string;
  name: string;
  email: string;
  flightIncluded: boolean;
  cancellationProtection: boolean;
  totalCost: number;
}

type NewBooking = Omit<BookingDetails, "id" | "userId" | "status">;

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [] as BookingDetails[],
  }),

  actions: {
    addBooking(booking: NewBooking) {
      this.loadingBookings();

      const newBooking: BookingDetails = {
        ...booking,
        id: Date.now().toString(),
        userId: 1,
        status: "confirmed",
      };

      this.bookings.push(newBooking);

      // Kontrollera om vi är på klientsidan
      if (process.client) {
        localStorage.setItem("bookings", JSON.stringify(this.bookings));
      }
    },

    deleteAllBookings() {
      this.bookings = [];
      if (process.client) {
        localStorage.removeItem("bookings");
      }
    },

    deleteBooking(id: string) {
      this.bookings = this.bookings.filter((booking) => booking.id !== id);
      if (process.client) {
        localStorage.setItem("bookings", JSON.stringify(this.bookings));
      }
    },

    loadingBookings() {
      if (process.client) {
        const storedBookings = localStorage.getItem("bookings");
        if (storedBookings) {
          this.bookings = JSON.parse(storedBookings);
        }
      }
    },
  },
  getters: {
    bookingCount: (state) => state.bookings.length,
  },
});
