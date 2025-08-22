"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const generateSeatLayout = (cinemaId, showTime) => {
  const seatKey = `${cinemaId}-${showTime}`
  const seed = seatKey.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const layout = {
    vip: { rows: ["J"], seatsPerRow: 10, price: 500 },
    executive: { rows: ["I", "H", "G", "F"], seatsPerRow: 10, price: 350 },
    normal: { rows: ["E", "D", "C", "B", "A"], seatsPerRow: 10, price: 320 },
  }

  const seats = {}

  Object.entries(layout).forEach(([category, config]) => {
    config.rows.forEach((row) => {
      for (let seatNum = 1; seatNum <= config.seatsPerRow; seatNum++) {
        const seatId = `${row}${seatNum}`
        const seatSeed = seed + row.charCodeAt(0) + seatNum
        const isBooked = seatSeed % 7 === 0

        seats[seatId] = {
          id: seatId,
          row,
          number: seatNum,
          category,
          price: config.price,
          status: isBooked ? "booked" : "available",
          isSelected: false,
        }
      }
    })
  })

  return seats
}

const getSeatBlockingKey = (cinemaId, showTime, date) => {
  return `seat_blocking_${cinemaId}_${showTime}_${date}`
}

const blockSeats = (cinemaId, showTime, date, seatIds, userId) => {
  const key = getSeatBlockingKey(cinemaId, showTime, date)
  const blockedSeats = JSON.parse(localStorage.getItem(key) || "{}")
  const timestamp = Date.now()

  seatIds.forEach((seatId) => {
    blockedSeats[seatId] = {
      userId,
      timestamp,
      expiresAt: timestamp + 15 * 60 * 1000, // 15 minutes
    }
  })

  localStorage.setItem(key, JSON.stringify(blockedSeats))
}

const unblockSeats = (cinemaId, showTime, date, seatIds, userId) => {
  const key = getSeatBlockingKey(cinemaId, showTime, date)
  const blockedSeats = JSON.parse(localStorage.getItem(key) || "{}")

  seatIds.forEach((seatId) => {
    if (blockedSeats[seatId] && blockedSeats[seatId].userId === userId) {
      delete blockedSeats[seatId]
    }
  })

  localStorage.setItem(key, JSON.stringify(blockedSeats))
}

const getBlockedSeats = (cinemaId, showTime, date) => {
  const key = getSeatBlockingKey(cinemaId, showTime, date)
  const blockedSeats = JSON.parse(localStorage.getItem(key) || "{}")
  const now = Date.now()

  // Clean up expired blocks
  const validBlocks = {}
  Object.entries(blockedSeats).forEach(([seatId, block]) => {
    if (block.expiresAt > now) {
      validBlocks[seatId] = block
    }
  })

  localStorage.setItem(key, JSON.stringify(validBlocks))
  return validBlocks
}

export default function SeatSelectionPage() {
  const [bookingData, setBookingData] = useState(null)
  const [seats, setSeats] = useState({})
  const [selectedSeats, setSelectedSeats] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [blockedSeats, setBlockedSeats] = useState({})
  const [blockingTimer, setBlockingTimer] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const booking = localStorage.getItem("currentBooking")
    const user = localStorage.getItem("currentUser")

    if (!booking || !user) {
      router.push("/")
      return
    }

    const bookingInfo = JSON.parse(booking)
    const userInfo = JSON.parse(user)

    setBookingData(bookingInfo)
    setCurrentUser(userInfo)

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const showBookings = existingBookings.filter(
      (b) =>
        b.cinemaId === bookingInfo.cinemaId &&
        b.showTime === bookingInfo.showTime &&
        b.date === bookingInfo.date &&
        b.status === "confirmed",
    )

    const seatLayout = generateSeatLayout(bookingInfo.cinemaId, bookingInfo.showTime)

    // Mark seats as booked only for confirmed bookings
    showBookings.forEach((booking) => {
      booking.seats.forEach((seatId) => {
        if (seatLayout[seatId]) {
          seatLayout[seatId].status = "booked"
        }
      })
    })

    setSeats(seatLayout)

    const updateBlockedSeats = () => {
      const blocked = getBlockedSeats(bookingInfo.cinemaId, bookingInfo.showTime, bookingInfo.date)
      setBlockedSeats(blocked)
    }

    updateBlockedSeats()
    const interval = setInterval(updateBlockedSeats, 1000) // Update every second

    return () => {
      clearInterval(interval)
      // Clean up any seat blocks when leaving the page
      if (selectedSeats.length > 0) {
        unblockSeats(bookingInfo.cinemaId, bookingInfo.showTime, bookingInfo.date, selectedSeats, currentUser.id)
      }
    }
  }, [router])

  useEffect(() => {
    if (bookingData && currentUser && selectedSeats.length > 0) {
      // Clear existing timer
      if (blockingTimer) {
        clearTimeout(blockingTimer)
      }

      // Block the selected seats
      blockSeats(bookingData.cinemaId, bookingData.showTime, bookingData.date, selectedSeats, currentUser.id)

      // Set timer to unblock seats after 15 minutes
      const timer = setTimeout(
        () => {
          unblockSeats(bookingData.cinemaId, bookingData.showTime, bookingData.date, selectedSeats, currentUser.id)
          setSelectedSeats([])
          alert("Your seat selection has expired. Please select seats again.")
        },
        15 * 60 * 1000,
      )

      setBlockingTimer(timer)
    }

    return () => {
      if (blockingTimer) {
        clearTimeout(blockingTimer)
      }
    }
  }, [selectedSeats, bookingData, currentUser])

  const handleSeatClick = (seatId) => {
    const seat = seats[seatId]
    if (seat.status === "booked") return

    const blocked = blockedSeats[seatId]
    if (blocked && blocked.userId !== currentUser.id) {
      alert("This seat is currently being selected by another user. Please choose a different seat.")
      return
    }

    if (selectedSeats.includes(seatId)) {
      const newSelectedSeats = selectedSeats.filter((id) => id !== seatId)
      setSelectedSeats(newSelectedSeats)

      // Unblock the deselected seat
      unblockSeats(bookingData.cinemaId, bookingData.showTime, bookingData.date, [seatId], currentUser.id)
    } else {
      if (selectedSeats.length >= 6) {
        alert("You can select maximum 6 seats")
        return
      }
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      return total + seats[seatId].price
    }, 0)
  }

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat")
      return
    }

    const booking = {
      id: Date.now(),
      userId: currentUser.id,
      movieId: bookingData.movieId,
      movieTitle: bookingData.movieTitle,
      cinemaId: bookingData.cinemaId,
      cinemaName: bookingData.cinemaName,
      showTime: bookingData.showTime,
      date: bookingData.date,
      seats: selectedSeats,
      totalPrice: getTotalPrice(),
      bookingTime: new Date().toISOString(),
      status: "confirmed",
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("bookings", JSON.stringify(existingBookings))

    unblockSeats(bookingData.cinemaId, bookingData.showTime, bookingData.date, selectedSeats, currentUser.id)

    localStorage.removeItem("currentBooking")
    router.push("/booking/confirmation")
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center text-gray-800">
        Loading...
      </div>
    )
  }

  const renderSeatSection = (category, rows) => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg capitalize text-gray-800">{category}</h3>
          <span className="text-lg font-bold text-gray-800">
            ₹{seats[Object.keys(seats).find((id) => seats[id].category === category)]?.price}
          </span>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center space-x-2">
              <div className="w-8 text-center font-bold text-gray-800">{row}</div>
              <div className="flex space-x-1">
                {Object.values(seats)
                  .filter((seat) => seat.row === row)
                  .map((seat) => {
                    const isBlocked = blockedSeats[seat.id] && blockedSeats[seat.id].userId !== currentUser.id
                    const isMySelection = selectedSeats.includes(seat.id)
                    const isBooked = seat.status === "booked"

                    return (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id)}
                        className={`w-8 h-8 text-xs rounded border transition-all ${
                          isBooked
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : isBlocked
                              ? "bg-orange-400 text-white cursor-not-allowed animate-pulse"
                              : isMySelection
                                ? "bg-blue-600 text-white shadow-lg scale-110"
                                : "bg-green-500 border-green-400 hover:bg-green-400 text-white hover:scale-105"
                        }`}
                        disabled={isBooked || isBlocked}
                        title={
                          isBooked
                            ? "Seat is booked"
                            : isBlocked
                              ? "Seat is being selected by another user"
                              : "Available seat"
                        }
                      >
                        {seat.number}
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/movie/${bookingData.movieId}`} className="flex items-center space-x-4 text-gray-800">
              <ArrowLeft className="h-5 w-5" />
              <div>
                <div className="font-medium">{bookingData.movieTitle}</div>
                <div className="text-sm text-gray-600">
                  {bookingData.cinemaName} | {bookingData.date} | {bookingData.showTime}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                {/* Screen */}
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg py-3 px-8 inline-block mb-2 shadow-lg">
                    <span className="text-white font-medium">SCREEN</span>
                  </div>
                  <div className="text-sm text-gray-600">All eyes this way please!</div>
                </div>

                {/* VIP Section */}
                {renderSeatSection("vip", ["J"])}

                {/* Executive Section */}
                {renderSeatSection("executive", ["I", "H", "G", "F"])}

                {/* Normal Section */}
                {renderSeatSection("normal", ["E", "D", "C", "B", "A"])}

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 mt-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-700">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-700">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-400 rounded"></div>
                    <span className="text-gray-700">Being Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="text-gray-700">Sold</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Summary</h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <div className="text-sm text-gray-600">Movie</div>
                    <div className="font-medium text-gray-800">{bookingData.movieTitle}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Cinema</div>
                    <div className="font-medium text-sm text-gray-800">{bookingData.cinemaName}</div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-medium text-gray-800">{bookingData.date}</div>
                      <div className="font-medium text-gray-800">{bookingData.showTime}</div>
                    </div>
                  </div>

                  {selectedSeats.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600">Selected Seats</div>
                      <div className="font-medium text-gray-800">{selectedSeats.join(", ")}</div>
                    </div>
                  )}
                </div>

                {selectedSeats.length > 0 && (
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">Total Amount</span>
                      <span className="font-bold text-lg text-gray-800">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                >
                  Pay ₹{getTotalPrice()}
                </Button>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Please Note:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Maximum 6 seats can be selected</li>
                        <li>• Seats are blocked for 15 minutes when selected</li>
                        <li>• Orange seats are being selected by others</li>
                        <li>• Cancellation available from My Bookings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
