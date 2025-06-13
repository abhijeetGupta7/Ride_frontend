# 🚕 Ridee – Frontend

**Ridee** is a real-time ride-sharing application frontend where users and drivers ("captains") can register, request rides, and track locations live on an interactive map. Built with React, Vite, Tailwind CSS, and WebSockets.

---

## � Key Features

- **Authentication**  
  • JWT-based registration/login for users & captains  
  • Secure cookie/localStorage token management  
- **Protected Routing**  
  • Role-based access control for dashboards  
- **Live Geolocation**  
  • Real-time tracking with Leaflet/Google Maps  
- **Ride Management**  
  • Pickup/destination selection  
  • Vehicle type options  
  • Ride request flow  
- **Real-time Updates**  
  • Socket.io notifications for ride status changes  
- **Responsive UI**  
  • Mobile-first Tailwind CSS design  
- **Enhanced UX**  
  • GSAP animations for smooth transitions  

---

## 🛠 Tech Stack

| Category          | Technologies                          |
|-------------------|---------------------------------------|
| Core              | React 19, Vite                        |
| Styling           | Tailwind CSS                          |
| Routing           | React Router v7                       |
| Maps              | Leaflet (Google Maps optional)        |
| Real-Time         | Socket.io-client                      |
| API Client        | Axios                                 |
| State Management  | React Context API                     |
| Animations        | GSAP                                  |
| Icons             | FontAwesome, React-Icons              |

---

## ⚙️ Configuration

Create `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8050/api/v1
VITE_BASE_URL=http://localhost:8050

# Maps (Optional)
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

---

## 🚀 Local Development

```bash
# 1. Clone repository
git clone https://github.com/abhijeetGupta7/Ride_frontend
cd Ride_frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Access: `http://localhost:5173`

---

## 🚀 Deployment

### Build & Preview
```bash
npm run build    # Generates production build
npm run preview  # Local preview of build
```

### Hosting
1. Deploy `dist/` folder to static hosting
2. Configure SPA fallback routes:
   - All requests → `/index.html`

Recommended providers:
- Render (demo)
- Vercel
- Netlify

---

## 🌐 Live Demos

- Frontend: [https://ride-frontend.onrender.com](https://ride-frontend.onrender.com)
- Backend: [https://ride-backend-m1x6.onrender.com](https://ride-backend-m1x6.onrender.com)

---

## 📝 Implementation Notes

1. **Backend Requirements**
   - Ensure CORS is configured for your frontend domain
   - Backend must be running for full functionality

2. **Maps Integration**
   - Leaflet works without API keys
   - Google Maps requires billing-enabled project

3. **Production Considerations**
   - Enable HTTPS for geolocation APIs
   - Set proper cache headers for static assets

---

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create feature branch (`git checkout -b feat/your-feature`)
3. Commit changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to branch (`git push origin feat/your-feature`)
5. Open pull request

---

> Developed with ❤️ by Abhijeet Gupta  
> If you find this project useful, please consider giving it a ⭐!

---
