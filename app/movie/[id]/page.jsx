"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Star, Play, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const movies = [
  {
    id: 1,
        title: "War 2",
        language: "Hindi",
        genre: "Action/Thriller",
        rating: "UA 16+",
        duration: "2h 53m",
        image: "https://m.media-amazon.com/images/M/MV5BY2U0MGFkNzctOGI5OC00MzhhLWExYTctZjE5YjY3MzcwYjMzXkEyXkFqcGc@._V1_.jpg",
        description:
          "Years ago Agent Kabir went rogue. Became India's greatest villain ever. But this time, as he descends further into the deepest shadows India sends its deadliest, most lethal agent after him. A Special Units Officer who is more than Kabir's equal! Absolutely Nuclear! Agent Vikram. A relentless Terminator driven by his own demons, determined to put a bullet into Kabir's skull. A brutal Cat versus Rottweiler game begins as the two face off - The entire world is their brutal bloody battleground.",
        cast: ["Hrithik Roshan", "Tiger Shroff", "Vaani Kapoor"],
        director: "Siddharth Anand",
        imdbRating: 8.2,
        availableCinemas: [1, 2, 3],
        showTimes: ["03:35 PM", "06:05 PM", "09:15 PM", "11:20 PM"],
        releaseDate: "14 Aug, 2025",
  },
  {id: 2,
        title: "Pushpa 2: The Rule",
        language: "Telugu",
        genre: "Action/Drama",
        rating: "UA 16+",
        duration: "3h 20m",
        image: "https://i.pinimg.com/736x/d6/3c/10/d63c1030a290bc632fd424868f6fbfe0.jpg",
        description:
          "Pushpa Raj is a coolie who rises in the world of red sandalwood smuggling. Along the way, he doesn't shy from making an enemy or two. This is the story of his rise and the rule he establishes in the Seshachalam forests. The film follows Pushpa's journey as he becomes the kingpin of red sandalwood smuggling while facing challenges from law enforcement and rival smugglers.",
        cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
        director: "Sukumar",
        imdbRating: 8.7,
        availableCinemas: [1, 2],
        showTimes: ["02:50 PM", "06:30 PM", "10:10 PM"],
        releaseDate: "6 Dec, 2024",
  },
  {
    id: 3,
        title: "Mufasa: The Lion King",
        language: "English",
        genre: "Animation/Family",
        rating: "U",
        duration: "1h 58m",
        image: "https://i.pinimg.com/736x/da/bb/4d/dabb4d4f220c42c00affd015220ba206.jpg",
        description:
          "Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny. Their bonds will be tested as they work together to evade a threatening and deadly foe. This prequel explores the unlikely rise of the beloved king of the Pride Lands.",
        cast: ["Aaron Pierre", "Kelvin Harrison Jr.", "Tiffany Boone"],
        director: "Barry Jenkins",
        imdbRating: 7.8,
        availableCinemas: [2, 3],
        showTimes: ["01:30 PM", "04:15 PM", "07:00 PM", "09:45 PM"],
        releaseDate: "20 Dec, 2024",
  },
  {
    id: 4,
        title: "Stree 2: Sarkate Ka Aatank",
        language: "Hindi",
        genre: "Horror/Comedy",
        rating: "UA 13+",
        duration: "2h 29m",
        image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:420,cw:1080,ch:1080,q:80,w:1080/QtjRZZXqo2PC9TrLAGGyA3.jpg",
        description:
          "After the events of Stree, the town of Chanderi is being haunted by a headless entity that is abducting women. Vicky and his friends join hands with Stree to save the town and the women. The sequel brings back the beloved characters in a new supernatural adventure filled with comedy, horror, and social commentary about women's safety and empowerment.",
        cast: ["Rajkummar Rao", "Shraddha Kapoor", "Pankaj Tripathi", "Aparshakti Khurana"],
        director: "Amar Kaushik",
        imdbRating: 8.1,
        availableCinemas: [1, 3],
        showTimes: ["12:30 PM", "03:45 PM", "07:15 PM", "10:30 PM"],
        releaseDate: "15 Aug, 2024",
  },
  {
    id: 5,
        title: "Kalki 2898 AD",
        language: "Telugu",
        genre: "Sci-Fi/Action",
        rating: "UA 16+",
        duration: "3h 1m",
        image: "https://lthsvanguard.com/wp-content/uploads/2024/10/611OnIlr2qL._AC_UF8941000_QL80_.jpg",
        description:
          "Set in the year 2898 AD, this epic science fiction film draws inspiration from Hindu mythology, particularly the Kalki avatar. The story unfolds in a post-apocalyptic world where the last city on Earth, Kasi, is ruled by the tyrannical Complex. Bhairava, a bounty hunter, becomes entangled in the prophecy of Kalki's birth, leading to an epic battle between good and evil across time and space.",
        cast: ["Prabhas", "Deepika Padukone", "Amitabh Bachchan", "Kamal Haasan"],
        director: "Nag Ashwin",
        imdbRating: 8.4,
        availableCinemas: [1, 2, 3],
        showTimes: ["11:00 AM", "03:15 PM", "07:30 PM", "11:00 PM"],
        releaseDate: "27 Jun, 2024",
  },
  {
    id: 6,
        title: "Bade Miyan Chote Miyan",
        language: "Hindi",
        genre: "Action/Thriller",
        rating: "UA 16+",
        duration: "2h 44m",
        image: "https://m.media-amazon.com/images/M/MV5BMDE4Yzc3YTctODE5My00Mjg3LWI0ZDktZjM4MmVkMTQ3ZmNmXkEyXkFqcGc@._V1_.jpg",
        description:
          "Two elite soldiers with the codenames Bade Miyan and Chote Miyan are tasked with recovering a stolen AI weapon before it falls into the wrong hands. This high-octane action thriller takes the duo across international locations as they face off against a masked villain who threatens global security. Packed with spectacular action sequences, cutting-edge technology, and patriotic fervor.",
        cast: ["Akshay Kumar", "Tiger Shroff", "Prithviraj Sukumaran", "Manushi Chhillar"],
        director: "Ali Abbas Zafar",
        imdbRating: 7.2,
        availableCinemas: [2, 3],
        showTimes: ["01:00 PM", "04:30 PM", "08:00 PM", "11:15 PM"],
        releaseDate: "10 Apr, 2024",
  },
]

const getCinemasForMovie = (movieId) => {
  const baseCinemas = [
    {
      id: 1,
      name: "Cinepolis: Pacific NSP2, Delhi",
      location: "Pacific Mall, NSP",
      facilities: ["2K LASER DOLBY 7.1", "Cancellation Available"],
    },
    {
      id: 2,
      name: "PVR: Vegas Dwarka",
      location: "Vegas Mall, Dwarka",
      facilities: ["KOTAK LUXE", "Non-cancellable"],
    },
    {
      id: 3,
      name: "US CINEMAS: Galaxy Blue Sapphire, Noida Ext",
      location: "Galaxy Blue Sapphire Mall",
      facilities: ["4K ATMOS", "Cancellation Available"],
    },
  ]

  // Different show times and pricing based on movie
  const showSchedules = {
    1: [
      // War 2
      [
        { time: "03:35 PM", format: "2K LASER DOLBY 7.1", price: 320 },
        { time: "04:05 PM", format: "DOLBY ATMOS", price: 350 },
        { time: "06:05 PM", format: "2K LASER DOLBY 7.1", price: 320 },
        { time: "07:20 PM", format: "2K LASER DOLBY 7.1", price: 320 },
      ],
      [
        { time: "02:50 PM", format: "4K ATMOS", price: 400 },
        { time: "03:25 PM", format: "EMINENCE CUT REC", price: 450 },
        { time: "04:00 PM", format: "EUROPA LUX", price: 500 },
        { time: "04:20 PM", format: "KOTAK LUXE", price: 550 },
      ],
      [
        { time: "03:40 PM", format: "4K ATMOS", price: 280 },
        { time: "04:10 PM", format: "EMINENCE CUT REC", price: 320 },
        { time: "04:40 PM", format: "EUROPA LUX", price: 380 },
        { time: "05:35 PM", format: "EMINENCE CUT REC", price: 320 },
      ],
    ],
    2: [
      // Pushpa 2
      [
        { time: "02:30 PM", format: "2K LASER DOLBY 7.1", price: 300 },
        { time: "06:00 PM", format: "DOLBY ATMOS", price: 330 },
        { time: "09:30 PM", format: "2K LASER DOLBY 7.1", price: 300 },
      ],
      [
        { time: "01:45 PM", format: "4K ATMOS", price: 380 },
        { time: "05:15 PM", format: "KOTAK LUXE", price: 520 },
        { time: "08:45 PM", format: "EUROPA LUX", price: 480 },
      ],
      [
        { time: "02:15 PM", format: "4K ATMOS", price: 260 },
        { time: "05:45 PM", format: "EMINENCE CUT REC", price: 300 },
        { time: "09:15 PM", format: "4K ATMOS", price: 260 },
      ],
    ],
    3: [
      // Mufasa
      [
        { time: "11:00 AM", format: "2K LASER DOLBY 7.1", price: 250 },
        { time: "01:30 PM", format: "DOLBY ATMOS", price: 280 },
        { time: "04:00 PM", format: "2K LASER DOLBY 7.1", price: 250 },
        { time: "06:30 PM", format: "DOLBY ATMOS", price: 280 },
      ],
      [
        { time: "10:45 AM", format: "4K ATMOS", price: 320 },
        { time: "01:15 PM", format: "EUROPA LUX", price: 420 },
        { time: "03:45 PM", format: "KOTAK LUXE", price: 450 },
        { time: "06:15 PM", format: "4K ATMOS", price: 320 },
      ],
      [
        { time: "11:15 AM", format: "4K ATMOS", price: 220 },
        { time: "01:45 PM", format: "EMINENCE CUT REC", price: 260 },
        { time: "04:15 PM", format: "4K ATMOS", price: 220 },
        { time: "06:45 PM", format: "EMINENCE CUT REC", price: 260 },
      ],
    ],
    4: [
      // Sonic 3
      [
        { time: "12:00 PM", format: "2K LASER DOLBY 7.1", price: 240 },
        { time: "02:15 PM", format: "DOLBY ATMOS", price: 270 },
        { time: "04:30 PM", format: "2K LASER DOLBY 7.1", price: 240 },
        { time: "06:45 PM", format: "DOLBY ATMOS", price: 270 },
      ],
      [
        { time: "11:30 AM", format: "4K ATMOS", price: 310 },
        { time: "01:45 PM", format: "EUROPA LUX", price: 410 },
        { time: "04:00 PM", format: "KOTAK LUXE", price: 440 },
        { time: "06:15 PM", format: "4K ATMOS", price: 310 },
      ],
      [
        { time: "12:15 PM", format: "4K ATMOS", price: 210 },
        { time: "02:30 PM", format: "EMINENCE CUT REC", price: 250 },
        { time: "04:45 PM", format: "4K ATMOS", price: 210 },
        { time: "07:00 PM", format: "EMINENCE CUT REC", price: 250 },
      ],
    ],
    5: [
      // Nosferatu
      [
        { time: "07:00 PM", format: "2K LASER DOLBY 7.1", price: 350 },
        { time: "09:45 PM", format: "DOLBY ATMOS", price: 380 },
      ],
      [
        { time: "06:30 PM", format: "4K ATMOS", price: 450 },
        { time: "09:15 PM", format: "KOTAK LUXE", price: 580 },
      ],
      [
        { time: "07:15 PM", format: "4K ATMOS", price: 320 },
        { time: "10:00 PM", format: "EMINENCE CUT REC", price: 360 },
      ],
    ],
    6: [
      // Wicked
      [
        { time: "01:00 PM", format: "2K LASER DOLBY 7.1", price: 320 },
        { time: "04:30 PM", format: "DOLBY ATMOS", price: 350 },
        { time: "08:00 PM", format: "2K LASER DOLBY 7.1", price: 320 },
      ],
      [
        { time: "12:30 PM", format: "4K ATMOS", price: 420 },
        { time: "04:00 PM", format: "EUROPA LUX", price: 520 },
        { time: "07:30 PM", format: "KOTAK LUXE", price: 550 },
      ],
      [
        { time: "01:15 PM", format: "4K ATMOS", price: 290 },
        { time: "04:45 PM", format: "EMINENCE CUT REC", price: 330 },
        { time: "08:15 PM", format: "4K ATMOS", price: 290 },
      ],
    ],
  }

  return baseCinemas.map((cinema, index) => ({
    ...cinema,
    shows: showSchedules[movieId]?.[index] || showSchedules[1][index],
  }))
}

export default function MovieDetailPage({ params }) {
  const [selectedDate, setSelectedDate] = useState("21")
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  const movie = movies.find((m) => m.id === Number.parseInt(params.id))
  const cinemas = movie ? getCinemasForMovie(movie.id) : []

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center text-gray-800">
        Movie not found
      </div>
    )
  }

  const handleBooking = (cinemaId, showTime, price) => {
    if (!currentUser) {
      router.push("/auth")
      return
    }

    const bookingData = {
      movieId: movie.id,
      movieTitle: movie.title,
      cinemaId,
      cinemaName: cinemas.find((c) => c.id === cinemaId)?.name,
      showTime,
      price,
      date: `2025-08-${selectedDate}`,
    }

    localStorage.setItem("currentBooking", JSON.stringify(bookingData))
    router.push("/booking/seats")
  }

  const dates = [
    { day: "THU", date: "21", month: "AUG" },
    { day: "FRI", date: "22", month: "AUG" },
    { day: "SAT", date: "23", month: "AUG" },
    { day: "SUN", date: "24", month: "AUG" },
    { day: "MON", date: "25", month: "AUG" },
    { day: "TUE", date: "26", month: "AUG" },
    { day: "WED", date: "27", month: "AUG" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 text-gray-800">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">
                {movie.title} - ({movie.language})
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Share2 className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
              {currentUser ? (
                <span className="text-sm text-gray-700">Hi, {currentUser.name}</span>
              ) : (
                <Link href="/auth">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-white/60 backdrop-blur-sm"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Movie Hero Section */}
      <section className="relative bg-white/60 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-80 mx-auto lg:mx-0">
              <div className="relative group">
                <Image
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  width={320}
                  height={480}
                  className="rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30">
                    <Play className="h-5 w-5 mr-2" />
                    Trailers (12)
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-600 text-sm">In cinemas</span>
              </div>
            </div>

            <div className="flex-1 text-gray-800">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1 bg-blue-600 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-white" />
                  <span className="text-white font-medium">{movie.imdbRating}/10</span>
                </div>
                <span className="text-gray-600">(136.4K Votes)</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-white/60 backdrop-blur-sm"
                >
                  Rate now
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.formats?.map((format, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200"
                  >
                    {format}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.languages?.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm border border-purple-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <span>•</span>
                <span>{movie.genre}</span>
                <span>•</span>
                <span>{movie.rating}</span>
                <span>•</span>
                <span>{movie.releaseDate}</span>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl mb-8 transform hover:scale-105 transition-all">
                Book tickets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About the Movie */}
      <section className="py-8 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About the movie</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{movie.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Cast</h3>
              <p className="text-gray-600">{movie.cast?.join(", ")}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-800">Director</h3>
              <p className="text-gray-600">{movie.director}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Date Selection */}
      <section className="bg-white/60 backdrop-blur-md border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto">
            {dates.map((date) => (
              <button
                key={date.date}
                onClick={() => setSelectedDate(date.date)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-center min-w-[80px] transition-all ${
                  selectedDate === date.date
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/60 backdrop-blur-md text-gray-700 hover:bg-white/80 border border-gray-200"
                }`}
              >
                <div className="text-xs">{date.day}</div>
                <div className="font-bold">{date.date}</div>
                <div className="text-xs">{date.month}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cinema Listings */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {cinemas.map((cinema) => (
              <Card
                key={cinema.id}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-gray-800">{cinema.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{cinema.location}</p>
                        <div className="flex flex-wrap gap-2">
                          {cinema.facilities.map((facility, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs border border-green-200"
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {cinema.shows.map((show, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="border-green-300 text-green-700 hover:bg-green-50 bg-white/60 backdrop-blur-md px-4 py-6 h-auto"
                          onClick={() => handleBooking(cinema.id, show.time, show.price)}
                        >
                          <div className="text-center">
                            <div className="font-medium text-sm">{show.time}</div>
                            <div className="text-xs text-gray-500">{show.format}</div>
                            <div className="text-xs font-medium">₹{show.price}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
