"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Film, Building, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState("movies")
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [movies, setMovies] = useState([])
  const [cinemas, setCinemas] = useState([])
  const [editingMovie, setEditingMovie] = useState(null)
  const [isAddingMovie, setIsAddingMovie] = useState(false)
  const [editingCinema, setEditingCinema] = useState(null)
  const [isAddingCinema, setIsAddingCinema] = useState(false)
  const [viewingSeatLayout, setViewingSeatLayout] = useState(null)
  const [hoveredSeat, setHoveredSeat] = useState(null)
  const [viewingAllBookings, setViewingAllBookings] = useState(false)
  const router = useRouter()

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === "Vegeta@123") {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password!")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const storedMovies = JSON.parse(localStorage.getItem("movies") || "[]")
      const storedCinemas = JSON.parse(localStorage.getItem("cinemas") || "[]")

      const initialMovies = storedMovies.length > 0 ? storedMovies : getDefaultMovies()
      const initialCinemas = storedCinemas.length > 0 ? storedCinemas : getDefaultCinemas()

      localStorage.setItem("movies", JSON.stringify(initialMovies))
      localStorage.setItem("cinemas", JSON.stringify(initialCinemas))

      setBookings(allBookings)
      setUsers(allUsers)
      setMovies(initialMovies)
      setCinemas(initialCinemas)
    }
  }, [isAuthenticated])

  const getDefaultCinemas = () => {
    const defaultCinemas = [
      {
        id: 1,
        name: "Cinepolis Pacific NSP2, Delhi",
        location: "Delhi",
        screens: 8,
        facilities: ["2K Laser", "Dolby 7.1", "Cancellation Available"],
      },
      {
        id: 2,
        name: "PVR Vegas Dwarka",
        location: "Dwarka",
        screens: 6,
        facilities: ["4K Atmos", "Dolby Atmos", "Kotak Luxe"],
      },
      {
        id: 3,
        name: "US Cinemas Galaxy Blue Sapphire, Noida Ext",
        location: "Noida",
        screens: 5,
        facilities: ["4K Atmos", "Eminence Cut Rec", "Europa Lux"],
      },
    ]
    localStorage.setItem("cinemas", JSON.stringify(defaultCinemas))
    return defaultCinemas
  }

  const getDefaultMovies = () => {
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

  const handleAddMovie = (movieData) => {
    const newMovie = {
      ...movieData,
      id: Date.now(),
      cast: movieData.cast.split(",").map((c) => c.trim()),
      availableCinemas: movieData.availableCinemas || [],
      showTimes: movieData.showTimes || ["03:35 PM", "06:05 PM", "09:15 PM"],
      releaseDate:
        movieData.releaseDate ||
        new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    }
    const updatedMovies = [...movies, newMovie]
    setMovies(updatedMovies)
    localStorage.setItem("movies", JSON.stringify(updatedMovies))
    window.dispatchEvent(new Event("storage"))
    setIsAddingMovie(false)
  }

  const handleEditMovie = (movieData) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === editingMovie.id
        ? {
            ...movieData,
            id: editingMovie.id,
            cast: movieData.cast.split(",").map((c) => c.trim()),
            availableCinemas: movieData.availableCinemas || [],
            showTimes: movieData.showTimes || movie.showTimes || ["03:35 PM", "06:05 PM", "09:15 PM"],
            releaseDate: movieData.releaseDate || movie.releaseDate,
          }
        : movie,
    )
    setMovies(updatedMovies)
    localStorage.setItem("movies", JSON.stringify(updatedMovies))
    window.dispatchEvent(new Event("storage"))
    setEditingMovie(null)
  }

  const handleDeleteMovie = (movieId) => {
    if (confirm("Are you sure you want to delete this movie? This will remove it from the homepage.")) {
      const updatedMovies = movies.filter((movie) => movie.id !== movieId)
      setMovies(updatedMovies)
      localStorage.setItem("movies", JSON.stringify(updatedMovies))
      window.dispatchEvent(new Event("storage"))
    }
  }

  const handleAddCinema = (cinemaData) => {
    const newCinema = {
      ...cinemaData,
      id: Date.now(),
      facilities: cinemaData.facilities.split(",").map((f) => f.trim()),
    }
    const updatedCinemas = [...cinemas, newCinema]
    setCinemas(updatedCinemas)
    localStorage.setItem("cinemas", JSON.stringify(updatedCinemas))
    setIsAddingCinema(false)
  }

  const handleEditCinema = (cinemaData) => {
    const updatedCinemas = cinemas.map((cinema) =>
      cinema.id === editingCinema.id
        ? {
            ...cinemaData,
            id: editingCinema.id,
            facilities: cinemaData.facilities.split(",").map((f) => f.trim()),
          }
        : cinema,
    )
    setCinemas(updatedCinemas)
    localStorage.setItem("cinemas", JSON.stringify(updatedCinemas))
    setEditingCinema(null)
  }

  const handleDeleteCinema = (cinemaId) => {
    if (confirm("Are you sure you want to delete this cinema?")) {
      const updatedCinemas = cinemas.filter((cinema) => cinema.id !== cinemaId)
      setCinemas(updatedCinemas)
      localStorage.setItem("cinemas", JSON.stringify(updatedCinemas))

      const updatedMovies = movies.map((movie) => ({
        ...movie,
        availableCinemas: movie.availableCinemas?.filter((id) => id !== cinemaId) || [],
      }))
      setMovies(updatedMovies)
      localStorage.setItem("movies", JSON.stringify(updatedMovies))
      window.dispatchEvent(new Event("storage"))
    }
  }

  const getSeatLayoutForShow = (movieId, cinemaId, showTime) => {
    const showKey = `${movieId}-${cinemaId}-${showTime}`
    const bookedSeats = JSON.parse(localStorage.getItem(`bookedSeats-${showKey}`) || "[]")
    const seatLayout = []

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const seatId = `${String.fromCharCode(65 + row)}${col + 1}`
        const booking = bookings.find(
          (b) =>
            b.movieId === movieId &&
            b.cinemaId === cinemaId &&
            b.showTime === showTime &&
            b.seats.includes(seatId) &&
            b.status === "confirmed",
        )

        seatLayout.push({
          id: seatId,
          row,
          col,
          isBooked: bookedSeats.includes(seatId),
          bookedBy: booking ? booking.userEmail : null,
        })
      }
    }

    return seatLayout
  }

  const getDetailedBookingInfo = () => {
    const detailedBookings = []

    movies.forEach((movie) => {
      movie.availableCinemas?.forEach((cinemaId) => {
        const cinema = cinemas.find((c) => c.id === cinemaId)
        if (!cinema) return

        movie.showTimes?.forEach((showTime) => {
          const showKey = `${movie.id}-${cinemaId}-${showTime}`
          const bookedSeats = JSON.parse(localStorage.getItem(`bookedSeats-${showKey}`) || "[]")

          if (bookedSeats.length > 0) {
            const showBookings = bookings.filter(
              (b) =>
                b.movieId === movie.id &&
                b.cinemaId === cinemaId &&
                b.showTime === showTime &&
                b.status === "confirmed",
            )

            detailedBookings.push({
              movie: movie.title,
              cinema: cinema.name,
              showTime,
              bookedSeats,
              bookings: showBookings,
              seatLayout: getSeatLayoutForShow(movie.id, cinemaId, showTime),
            })
          }
        })
      })
    })

    return detailedBookings
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalRevenue = bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + b.totalPrice, 0)
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Admin Dashboard</span>
            </Link>
            <span className="text-sm">NextShow Admin Panel</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Movies</p>
                  <p className="text-2xl font-bold text-gray-900">{movies.length}</p>
                </div>
                <Film className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cinemas</p>
                  <p className="text-2xl font-bold text-gray-900">{cinemas.length}</p>
                </div>
                <Building className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card
            className="bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setViewingAllBookings(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{confirmedBookings}</p>
                  <p className="text-xs text-blue-600 mt-1">Click to view details</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "movies", label: "Movies", icon: Film },
              { id: "cinemas", label: "Cinema Screen", icon: Building },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "movies" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Movie Management</h2>
              <Dialog open={isAddingMovie} onOpenChange={setIsAddingMovie}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Movie
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Movie</DialogTitle>
                  </DialogHeader>
                  <MovieForm cinemas={cinemas} onSubmit={handleAddMovie} onCancel={() => setIsAddingMovie(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <Card key={movie.id} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4 rounded-lg overflow-hidden">
                      <img
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {movie.genre} • {movie.duration} • {movie.language}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Release: {movie.releaseDate} • Rating: {movie.rating}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Available in:{" "}
                      {movie.availableCinemas
                        ?.map((id) => cinemas.find((c) => c.id === id)?.name)
                        .filter(Boolean)
                        .join(", ") || "No cinemas"}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{movie.description}</p>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingMovie(movie)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Movie</DialogTitle>
                          </DialogHeader>
                          <MovieForm
                            movie={editingMovie}
                            cinemas={cinemas}
                            onSubmit={handleEditMovie}
                            onCancel={() => setEditingMovie(null)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setViewingSeatLayout(movie)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Seat Layouts - {movie.title}</DialogTitle>
                          </DialogHeader>
                          <SeatLayoutViewer movie={movie} cinemas={cinemas} getSeatLayout={getSeatLayoutForShow} />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cinemas" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Cinema Screen Management</h2>
              <Dialog open={isAddingCinema} onOpenChange={setIsAddingCinema}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Cinema
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Cinema</DialogTitle>
                  </DialogHeader>
                  <CinemaForm onSubmit={handleAddCinema} onCancel={() => setIsAddingCinema(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cinemas.map((cinema) => (
                <Card key={cinema.id} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{cinema.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <Building className="h-4 w-4 inline mr-1" />
                      {cinema.location} • {cinema.screens} screens
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Facilities:</p>
                      <div className="flex flex-wrap gap-1">
                        {cinema.facilities?.map((facility, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingCinema(cinema)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Cinema</DialogTitle>
                          </DialogHeader>
                          <CinemaForm
                            cinema={editingCinema}
                            onSubmit={handleEditCinema}
                            onCancel={() => setEditingCinema(null)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCinema(cinema.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Dialog open={viewingAllBookings} onOpenChange={setViewingAllBookings}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>All Booking Details</DialogTitle>
            </DialogHeader>
            <AllBookingsViewer detailedBookings={getDetailedBookingInfo()} movies={movies} cinemas={cinemas} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function MovieForm({ movie, cinemas, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    language: movie?.language || "",
    genre: movie?.genre || "",
    rating: movie?.rating || "",
    duration: movie?.duration || "",
    image: movie?.image || "",
    description: movie?.description || "",
    cast: movie?.cast?.join(", ") || "",
    director: movie?.director || "",
    imdbRating: movie?.imdbRating || "",
    availableCinemas: movie?.availableCinemas || [],
    showTimes: movie?.showTimes?.join(", ") || "03:35 PM, 06:05 PM, 09:15 PM",
    releaseDate: movie?.releaseDate || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const processedData = {
      ...formData,
      showTimes: formData.showTimes.split(",").map((time) => time.trim()),
    }
    onSubmit(processedData)
  }

  const handleCinemaToggle = (cinemaId) => {
    const updatedCinemas = formData.availableCinemas.includes(cinemaId)
      ? formData.availableCinemas.filter((id) => id !== cinemaId)
      : [...formData.availableCinemas, cinemaId]

    setFormData({ ...formData, availableCinemas: updatedCinemas })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Movie Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          placeholder="Language"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          required
        />
        <Input
          placeholder="Rating"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          required
        />
        <Input
          placeholder="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Release Date (e.g., 14 Aug, 2025)"
          value={formData.releaseDate}
          onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          required
        />
        <Input
          placeholder="IMDB Rating"
          type="number"
          step="0.1"
          value={formData.imdbRating}
          onChange={(e) => setFormData({ ...formData, imdbRating: Number.parseFloat(e.target.value) })}
          required
        />
      </div>
      <Input
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />
      <Textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Cast (comma separated)"
          value={formData.cast}
          onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
          required
        />
        <Input
          placeholder="Director"
          value={formData.director}
          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
          required
        />
      </div>
      <Input
        placeholder="Show Times (comma separated, e.g., 03:35 PM, 06:05 PM)"
        value={formData.showTimes}
        onChange={(e) => setFormData({ ...formData, showTimes: e.target.value })}
        required
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Available Cinemas:</label>
        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cinema-${cinema.id}`}
                checked={formData.availableCinemas.includes(cinema.id)}
                onCheckedChange={() => handleCinemaToggle(cinema.id)}
              />
              <label htmlFor={`cinema-${cinema.id}`} className="text-sm">
                {cinema.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
          {movie ? "Update Movie" : "Add Movie"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function CinemaForm({ cinema, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: cinema?.name || "",
    location: cinema?.location || "",
    screens: cinema?.screens || 1,
    facilities: cinema?.facilities?.join(", ") || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Cinema Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />
      <Input
        placeholder="Number of Screens"
        type="number"
        min="1"
        value={formData.screens}
        onChange={(e) => setFormData({ ...formData, screens: Number.parseInt(e.target.value) })}
        required
      />
      <Textarea
        placeholder="Facilities (comma separated)"
        value={formData.facilities}
        onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
        required
      />
      <div className="flex space-x-4">
        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
          {cinema ? "Update Cinema" : "Add Cinema"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function SeatLayoutViewer({ movie, cinemas, getSeatLayout }) {
  const [selectedCinema, setSelectedCinema] = useState(null)
  const [selectedShowTime, setSelectedShowTime] = useState("")
  const [hoveredSeat, setHoveredSeat] = useState(null)

  const showTimes = movie.showTimes || ["03:35 PM", "06:05 PM", "09:15 PM", "11:20 PM"]
  const availableCinemas = cinemas.filter((cinema) => movie.availableCinemas?.includes(cinema.id))

  useEffect(() => {
    if (showTimes.length > 0 && !selectedShowTime) {
      setSelectedShowTime(showTimes[0])
    }
  }, [showTimes, selectedShowTime])

  const seatLayout =
    selectedCinema && selectedShowTime ? getSeatLayout(movie.id, selectedCinema.id, selectedShowTime) : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Select Cinema:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedCinema?.id || ""}
            onChange={(e) => setSelectedCinema(availableCinemas.find((c) => c.id === Number.parseInt(e.target.value)))}
          >
            <option value="">Choose Cinema</option>
            {availableCinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Select Show Time:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedShowTime}
            onChange={(e) => setSelectedShowTime(e.target.value)}
          >
            {showTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCinema && selectedShowTime && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center mb-4">
            <div className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg inline-block">SCREEN</div>
            <p className="text-sm text-gray-600 mt-2">
              {movie.title} • {selectedCinema.name} • {selectedShowTime}
            </p>
          </div>

          <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
            {seatLayout.map((seat) => (
              <div
                key={seat.id}
                className={`
                  w-8 h-8 rounded text-xs flex items-center justify-center cursor-pointer transition-colors
                  ${seat.isBooked ? "bg-gray-400 text-white" : "bg-green-500 text-white hover:bg-green-600"}
                `}
                onMouseEnter={() => setHoveredSeat(seat)}
                onMouseLeave={() => setHoveredSeat(null)}
              >
                {seat.id}
              </div>
            ))}
          </div>

          {hoveredSeat && hoveredSeat.bookedBy && (
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>Seat {hoveredSeat.id}</strong> - Booked by: {hoveredSeat.bookedBy}
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AllBookingsViewer({ detailedBookings, movies, cinemas }) {
  const [hoveredSeat, setHoveredSeat] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {detailedBookings.map((show, index) => (
          <Card key={index} className="bg-white border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{show.movie}</h3>
              <p className="text-sm text-gray-600 mb-1">{show.cinema}</p>
              <p className="text-sm text-gray-600 mb-2">{show.showTime}</p>
              <p className="text-sm font-medium mb-3">Booked Seats: {show.bookedSeats.length} seats</p>
              <Button variant="outline" size="sm" onClick={() => setSelectedShow(show)} className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Seat Layout
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedShow && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <div className="text-center mb-4">
            <div className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg inline-block">SCREEN</div>
            <p className="text-sm text-gray-600 mt-2">
              {selectedShow.movie} • {selectedShow.cinema} • {selectedShow.showTime}
            </p>
          </div>

          <div className="grid grid-cols-10 gap-1 max-w-md mx-auto mb-4">
            {selectedShow.seatLayout.map((seat) => (
              <div
                key={seat.id}
                className={`
                  w-8 h-8 rounded text-xs flex items-center justify-center cursor-pointer transition-colors
                  ${seat.isBooked ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}
                `}
                onMouseEnter={() => setHoveredSeat(seat)}
                onMouseLeave={() => setHoveredSeat(null)}
              >
                {seat.id}
              </div>
            ))}
          </div>

          {hoveredSeat && hoveredSeat.bookedBy && (
            <div className="p-4 bg-blue-100 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2">Booking Details for Seat {hoveredSeat.id}</h4>
              <p className="text-sm text-blue-800">
                <strong>Booked by:</strong> {hoveredSeat.bookedBy}
              </p>
              {selectedShow.bookings.find((b) => b.seats.includes(hoveredSeat.id)) && (
                <div className="mt-2 text-sm text-blue-800">
                  <p>
                    <strong>Booking ID:</strong>{" "}
                    {selectedShow.bookings.find((b) => b.seats.includes(hoveredSeat.id)).id}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹
                    {selectedShow.bookings.find((b) => b.seats.includes(hoveredSeat.id)).totalPrice}
                  </p>
                  <p>
                    <strong>Booking Date:</strong>{" "}
                    {new Date(
                      selectedShow.bookings.find((b) => b.seats.includes(hoveredSeat.id)).bookingDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Booked</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">All Bookings for this Show:</h4>
            <div className="space-y-2">
              {selectedShow.bookings.map((booking, idx) => (
                <div key={idx} className="p-3 bg-white rounded border">
                  <p className="text-sm">
                    <strong>{booking.userEmail}</strong> - Seats: {booking.seats.join(", ")} - ₹{booking.totalPrice}
                  </p>
                  <p className="text-xs text-gray-600">Booked on: {new Date(booking.bookingDate).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
