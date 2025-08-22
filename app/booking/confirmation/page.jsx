"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Clock, Ticket, Download } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
  const [latestBooking, setLatestBooking] = useState(null)

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    if (bookings.length > 0) {
      setLatestBooking(bookings[bookings.length - 1])
    }
  }, [])

  if (!latestBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center text-gray-800">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your tickets have been booked successfully</p>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">{latestBooking.movieTitle}</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{latestBooking.cinemaName}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{latestBooking.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{latestBooking.showTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Ticket className="h-4 w-4" />
                <span>Seats: {latestBooking.seats.join(", ")}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-xl text-gray-800">₹{latestBooking.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>

            <Link href="/bookings" className="block">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl bg-white"
              >
                View All Bookings
              </Button>
            </Link>

            <Link href="/" className="block">
              <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
