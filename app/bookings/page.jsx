"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Clock, Ticket } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BookingsPage() {
  const [currentUser, setCurrentUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/auth")
      return
    }

    const userInfo = JSON.parse(user)
    setCurrentUser(userInfo)

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const userBookings = allBookings.filter((booking) => booking.userId === userInfo.id)
    setBookings(userBookings.reverse())
  }, [router])

  const handleCancelBooking = (bookingId) => {
    if (confirm("Are you sure you want to cancel this booking? Your seats will become available for others.")) {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")

      // Find the booking to cancel
      const bookingToCancel = allBookings.find((booking) => booking.id === bookingId)

      if (bookingToCancel) {
        // Update booking status to cancelled
        const updatedBookings = allBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: "cancelled" } : booking,
        )
        localStorage.setItem("bookings", JSON.stringify(updatedBookings))

        // Update local state
        const userBookings = updatedBookings.filter((booking) => booking.userId === currentUser.id)
        setBookings(userBookings.reverse())

        // Show confirmation message
        alert(
          `Booking cancelled successfully! Seats ${bookingToCancel.seats.join(", ")} are now available for booking.`,
        )
      }
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center text-gray-800">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 text-gray-800">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">My Bookings</span>
            </Link>
            <span className="text-sm text-gray-700">Hi, {currentUser.name}</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your movie bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
            <CardContent className="p-8 text-center">
              <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
              <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring movies!</p>
              <Link href="/movies">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl">
                  Browse Movies
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{booking.movieTitle}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.cinemaName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.showTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Ticket className="h-4 w-4" />
                          <span>Seats: {booking.seats.join(", ")}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-gray-600 text-sm">Total Amount: </span>
                          <span className="font-bold text-lg text-gray-800">₹{booking.totalPrice}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Booked on: {new Date(booking.bookingTime).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {booking.status === "confirmed" && (
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button
                          variant="outline"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Cancel Booking
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
