// useTravelDates.ts
export function useTravelDates(hotel: {
  id?: string;
  name: string;
  available_dates?: AvailableDate[];
}) {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const travelDates = computed(() => {
    return (hotel?.available_dates || [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((dates) => {
        const totalTripDays = Math.ceil(
          (new Date(dates.arrival_home_day).getTime() -
            new Date(dates.date).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        const hotelDays = totalTripDays - dates.days_before_hotel * 2;

        return {
          departureDate: dates.date,
          returnDate: dates.arrival_home_day,
          formattedDepartureDate: formatDate(dates.date),
          formattedReturnDate: formatDate(dates.arrival_home_day),
          travelDays: dates.days_before_hotel,
          totalTripDays,
          hotelDays,
        };
      });
  });

  return {
    travelDates,
  };
}
