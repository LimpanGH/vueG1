import { defineStore } from 'pinia'

interface BookingDetails {
  id: string
  userId: number
  eventId: string
  eventTitle: string
  status: string
  startDate: string
  endDate: string
  adults: number
  children: number
  mealPlan: string
  name: string
  email: string
  flightIncluded: boolean
  cancellationProtection: boolean
  totalCost: number
}

type NewBooking = Omit<BookingDetails, 'id' | 'userId' | 'status'>

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [] as BookingDetails[]
  }),
  
  actions: {
    addBooking(booking: NewBooking) {
      const newBooking: BookingDetails = {
        ...booking,
        id: Date.now().toString(),
        userId: 1,
        status: 'confirmed'
      }
      
      this.bookings.push(newBooking)
      
      // fetch('http://localhost:3001/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newBooking)
      // })
    }
  }
}) 