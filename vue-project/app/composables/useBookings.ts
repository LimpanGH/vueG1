// import { ref } from "vue";

interface Booking {
  id: string;
  userId: number;
  eventId: number;
  eventTitle: string;
  status: "pending" | "confirmed";
}

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  label: string;
  description: string;
}

export default function useBookings() {
  const bookings = ref<Booking[]>([]);
  const loading = ref(false);

  const fetchBookings = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await fetch("http://localhost:3001/bookings");
      bookings.value = (await response.json()) as Booking[];
    } finally {
      loading.value = false;
    }
  };

  const findBookingById = (id: string): number =>
    bookings.value.findIndex((b) => b.id === id);

  const handleRegistration = async (event: Event): Promise<void> => {
    if (
      bookings.value.some(
        (booking) => booking.eventId === event.id && booking.userId === 1
      )
    ) {
      alert("You are already registered for this event.");
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      status: "pending",
    };

    bookings.value.push(newBooking);

    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBooking,
          status: "confirmed",
        }),
      });

      if (response.ok) {
        const index = findBookingById(newBooking.id);
        bookings.value[index] = (await response.json()) as Booking;
      } else {
        throw new Error("Failed to confirm booking");
      }
    } catch (e) {
      console.error(`Failed to register for event: `, e);
      bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
    }
  };

  const cancelBooking = async (bookingId: string): Promise<void> => {
    const index = findBookingById(bookingId);
    const originalBooking = bookings.value[index];

    if (!originalBooking) return;

    bookings.value.splice(index, 1);

    try {
      const response = await fetch(
        `http://localhost:3001/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Booking could not be cancelled.");
    } catch (e) {
      console.error(`Failed to cancel booking:`, e);
      bookings.value.splice(index, 0, originalBooking);
    }
  };

  return {
    bookings,
    loading,
    fetchBookings,
    handleRegistration,
    cancelBooking,
  };
}
