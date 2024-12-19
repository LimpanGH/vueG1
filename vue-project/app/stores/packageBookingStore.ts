import { defineStore } from "pinia";

interface PackageBooking {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  package: string;
  event: string;
  hotel: string;
  activity: string;
  mealPlan: string;
  flightIncluded: boolean;
  cancellationProtection: boolean;
  totalPrice: number;
  numAdults: number;
  numChildren: number;
  name: string;
  email: string;
}

type NewPackageBooking = Omit<PackageBooking, "id" | "status">;

export const usePackageBookingStore = defineStore("packageBookings", () => {
  const packageBookings = ref<PackageBooking[]>([]);

  const addPackageBooking = (booking: NewPackageBooking) => {
    loadPackageBookings();

    const newBooking: PackageBooking = {
      ...booking,
      id: Date.now().toString(),
      status: "Confirmed",
    };

    packageBookings.value.push(newBooking);

    if (process.client)
      localStorage.setItem(
        "packageBookings",
        JSON.stringify(packageBookings.value)
      );
  };

  const loadPackageBookings = () => {
    if (process.client) {
      const storedPackageBookings = localStorage.getItem("packageBookings");
      if (storedPackageBookings)
        packageBookings.value = JSON.parse(storedPackageBookings);
    }
  };

  const deleteOnePackageBooking = (id: string) => {
    packageBookings.value = packageBookings.value.filter(
      (booking) => booking.id != id
    );
    if (process.client)
      localStorage.setItem(
        "packageBookings",
        JSON.stringify(packageBookings.value)
      );
  };

  const deleteAllPackageBookings = () => {
    packageBookings.value = [];
    if (process.client) localStorage.removeItem("packageBookings");
  };

  return {
    packageBookings,
    addPackageBooking,
    loadPackageBookings,
    deleteOnePackageBooking,
    deleteAllPackageBookings,
  };
});
