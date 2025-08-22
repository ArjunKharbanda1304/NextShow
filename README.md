# 🎬 NextShow – Movie Booking System  

**NextShow** is a complete movie ticket booking web application built with **Next.js (TypeScript)**.  
It allows users to explore movies, select shows, book seats, and manage their bookings with ease.  
The system also provides a secure **Admin Panel** for managing cinemas, movies, and viewing booking details.  

---

# 🚀 How the Project Works  

The application is divided into two main parts: **User Interface** and **Admin Panel**.  

---

## 👤 User Side – Movie Booking Flow  

1. **Cinema & Movie Listings**  
   - Users land on the home screen and see all available cinemas.  
   - Each cinema displays the movies currently running, along with their showtimes.  

2. **Selecting a Show**  
   - When a user selects a movie and a showtime, they are taken to the seat selection screen.  

3. **Seat Selection & Allocation**  
   - Each screen follows a fixed **10x10 seat layout**.  
   - Seats are displayed visually with different colors for:  
     - ✅ Available seats  
     - ❌ Booked seats  
   - Users can select up to **6 seats per booking**.  

4. **Seat Blocking**  
   - Once a seat is booked, it immediately becomes blocked.  
   - This ensures no two users can book the same seat at the same time.  

5. **Booking Confirmation & Receipt**  
   - After confirming the seat selection, the booking is saved in the system.  
   - A **receipt screen** is displayed showing details like:  
     - Movie Name  
     - Cinema Name  
     - Show Time  
     - Seat Numbers  
   - This acts as the user’s proof of booking.  

6. **My Bookings Section**  
   - Users can view all their past bookings in one place.  
   - Each entry includes details of the movie, cinema, showtime, and seats booked.  

7. **Booking Cancellation**  
   - If a user decides not to attend, they can **cancel their booking** from the "My Bookings" section.  
   - Once cancelled, the seats become available again for others to book.  

---

## 🔑 Admin Panel  

NextShow provides a **secure Admin Dashboard** to manage the overall system.  
Only authorized users can access it using the admin password.  

- ➕ **Add Movies & Cinemas**  
  - Admins can add new movies and assign them to cinemas.  
  - They can also create new cinema entries for expansion.  

- ✏️ **Edit Movies & Cinemas**  
  - Update existing information such as movie details, show timings, or cinema details.  

- ❌ **Delete Movies & Cinemas**  
  - Remove outdated or inactive movies and cinemas.  

- 📋 **View Booking List**  
  - Admins can see the complete booking details for each show.  
  - By hovering or clicking on seats, admins can check **which user booked which seat**.  

### 🔐 Admin Access Details  
- **URL**: `/admin`  
- **Password**: `Vegeta@123`  

---

# 🛠️ Key Features  

- 🎟️ Browse cinemas and view currently available movies.  
- ⏰ Select shows with detailed timings.  
- 💺 Interactive seat selection with live availability.  
- 🛑 Seat blocking ensures no duplicate bookings.  
- ✅ Booking confirmation screen with receipt.  
- 📂 My Bookings section to track all transactions.  
- ❌ Option to cancel bookings and free up seats.  
- 🔑 Secure Admin Panel for managing system data.  
- 📊 Admin view of bookings for monitoring.  

---

# 🛠️ Tech Stack  

- **Frontend**: Next.js (TypeScript)  
- **Backend**: Node.js / Express.js  
- **Database**: MySQL  

---

# 📌 Summary  

NextShow is a fully functional movie booking system that demonstrates:  
- **Real-time seat management** (allocation, blocking, cancellation).  
- **Smooth user experience** for browsing, booking, and tracking reservations.  
- **Robust admin control** over cinemas, movies, and bookings.  

It ensures that both users and admins have a seamless and efficient way of handling movie bookings from start to finish.  
