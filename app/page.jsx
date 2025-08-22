"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, User, ChevronLeft, ChevronRight, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const loadMovies = () => {
    const storedMovies = JSON.parse(localStorage.getItem("movies") || "[]")
    if (storedMovies.length > 0) {
      return storedMovies
    }

    // Default movies if none in storage
    const defaultMovies = [
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
      {
        id: 2,
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

    localStorage.setItem("movies", JSON.stringify(defaultMovies))
    return defaultMovies
  }

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }

    const loadedMovies = loadMovies()
    setMovies(loadedMovies)
    setFilteredMovies(loadedMovies)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedMovies = loadMovies()
      setMovies(updatedMovies)
      setFilteredMovies(updatedMovies)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMovies(movies)
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.language.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredMovies(filtered)
    }
  }, [searchQuery, movies])

  useEffect(() => {
    if (movies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % movies.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [movies.length])

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  const nextSlide = () => {
    if (movies.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % movies.length)
    }
  }

  const prevSlide = () => {
    if (movies.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading NextShow...</p>
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
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Next
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Show
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-1 bg-white/60 backdrop-blur-md rounded-xl px-4 py-2 max-w-md border border-gray-200 shadow-sm">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                  className="border-0 bg-transparent focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Delhi-NCR</span>
              </div>

              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-white/60 backdrop-blur-sm"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>

              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hi, {currentUser.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-white/60 backdrop-blur-sm"
                  >
                    Sign Out
                  </Button>
                </div>
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

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-md text-gray-700 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12">
            <Link href="/movies" className="hover:text-blue-600 transition-colors font-medium">
              Movies
            </Link>
            {currentUser && (
              <Link href="/bookings" className="hover:text-blue-600 transition-colors font-medium">
                My Bookings
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      {movies.length > 0 && (
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>
          ))}

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {movies[currentSlide]?.title || "Loading..."}
              </h1>
              <p className="text-xl mb-8 text-gray-100 line-clamp-3">{movies[currentSlide]?.description || ""}</p>
              {movies[currentSlide] && (
                <Link href={`/movie/${movies[currentSlide].id}`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                  >
                    Book Now
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Movies */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {searchQuery ? `Search Results (${filteredMovies.length})` : "Recommended Movies"}
            </h2>
            <Link href="/movies" className="text-blue-600 hover:text-blue-500 font-medium">
              See All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border border-gray-200 hover:scale-105 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4 text-gray-800">
                  <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{movie.rating}</span>
                    <span>{movie.genre}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.description}</p>
                  <Link href={`/movie/${movie.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl">
                      Book Tickets
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No movies found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose NextShow?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience seamless booking with our user-friendly platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Easy Search</h3>
              <p className="text-gray-600">Find movies, events, and shows quickly with our advanced search</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Multiple Locations</h3>
              <p className="text-gray-600">Book tickets across various cinemas and venues in your city</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Secure Booking</h3>
              <p className="text-gray-600">Safe and secure payment process with instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Next
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Show
              </div>
            </div>
            <p className="text-gray-400">© 2025 NextShow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
