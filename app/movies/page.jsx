"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"
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
      "Years ago Agent Kabir went rogue. Became India's greatest villain ever. But this time, as he descends further into the deepest shadows India sends its deadliest, most lethal agent after him.",
  },
  {
    id: 2,
    title: "Pushpa 2: The Rule",
    language: "Hindi",
    genre: "Action/Drama",
    rating: "UA 16+",
    duration: "3h 20m",
    image: "https://i.pinimg.com/736x/d6/3c/10/d63c1030a290bc632fd424868f6fbfe0.jpg",
    description:
      "The rule continues with Pushpa Raj's empire expanding beyond borders. Facing new enemies and challenges, he must protect his syndicate while dealing with international smuggling operations.",
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
      "Explore the unlikely rise of the beloved king of the Pride Lands. Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline.",
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
  },
  {
    id: 5,
    title: "Kalki 2898 AD",
    language: "Hindi",
    genre: "Sci-Fi/Action",
    rating: "UA 16+",
    duration: "3h 1m",
    image: "https://lthsvanguard.com/wp-content/uploads/2024/10/611OnIlr2qL._AC_UF8941000_QL80_.jpg",
    backdrop: "/futuristic-cityscape-2898.png",
    description:
      "Set in the year 2898 AD, this futuristic epic follows the journey of Kalki, the prophesied tenth avatar of Vishnu. Starring Prabhas, this visual spectacle combines mythology with cutting-edge science fiction in a post-apocalyptic world.",
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
  },
]

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")

  const genres = [
    "All",
    "Action/Thriller",
    "Action/Drama",
    "Animation/Family",
    "Action/Adventure",
    "Horror/Drama",
    "Musical/Fantasy",
  ]
  const languages = ["All", "Hindi", "English"]

  useEffect(() => {
    let filtered = movies

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.language.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedGenre !== "All") {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre)
    }

    if (selectedLanguage !== "All") {
      filtered = filtered.filter((movie) => movie.language === selectedLanguage)
    }

    setFilteredMovies(filtered)
  }, [searchQuery, selectedGenre, selectedLanguage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 text-white">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">All Movies</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 max-w-md border border-white/20">
                <Search className="h-4 w-4 text-white/70" />
                <Input
                  placeholder="Search movies..."
                  className="border-0 bg-transparent focus:ring-0 text-sm text-white placeholder-white/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-white" />
            <span className="text-white font-medium">Filters:</span>
          </div>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre} className="bg-slate-800">
                {genre}
              </option>
            ))}
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1 text-white text-sm"
          >
            {languages.map((language) => (
              <option key={language} value={language} className="bg-slate-800">
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {searchQuery ? `Search Results (${filteredMovies.length})` : "All Movies"}
          </h1>
          <p className="text-white/70">
            {searchQuery ? `Showing results for "${searchQuery}"` : "Discover the latest movies"}
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 group"
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
              <CardContent className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
                  <span className="bg-white/20 px-2 py-1 rounded">{movie.rating}</span>
                  <span>{movie.genre}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{movie.description}</p>
                <Link href={`/movie/${movie.id}`}>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl">
                    Book Tickets
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No movies found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedGenre("All")
                setSelectedLanguage("All")
              }}
              className="mt-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
