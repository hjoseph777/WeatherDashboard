# 🌤️ Weather Dashboard - Project Instructions

<div align="center">

## **COVER PAGE**

---

### **Application Name:** Weather Dashboard  
### **Group Number:** Group 14  
### **Platform:** React Native using Expo CLI

---

### **Group Members**

| **Role** | **Developer** | **Responsibilities** |
|----------|---------------|---------------------|
| **Developer 1** | **Anupa Ragoonanan** | API Integration & Progress Management |
| **Developer 2** | **Harry Joseph** | Interactive Components & Gestures |
| **Developer 3** | **Raj Patel** | Modals, Notifications & Animations |
| **Developer 4** | **Kerlan Augustine** | Navigation & Project Documentation |

</div>

---

## **Purpose of the Application**

### **Who Needs This App? Innovation in Weather Applications**

Our **Weather Dashboard** addresses critical gaps in existing solutions by combining real-time data accuracy with modern UI/UX principles, offline functionality, and personalized interactivity—making it essential for today's mobile users.

### **Core User Needs & Solutions**

| Need | Solution |
|------|----------|
| **Universal Accessibility** | Clear, reliable access to weather data for all users |
| **Mobile-First Experience** | Fast React Native performance tailored for mobile |
| **Enhanced User Experience** | Dynamic animations, gesture navigation, interactive components |
| **Offline Access** | AsyncStorage retains data for low-connectivity environments |
| **Multi-Location Management** | Save and switch between multiple locations effortlessly |

### **Real-World Impact**
- 🎓 **Students:** Plan outdoor activities based on real-time weather  
- 💼 **Professionals:** Optimize commutes around weather disruptions  
- ✈️ **Travelers:** Track forecasts across multiple destinations  
- 👨‍👩‍👧‍👦 **Families:** Coordinate weekend activities with accurate forecasts

---

## **Core Features**

**Display Weather Information:** Current conditions, temperature, humidity, wind speed, 7-day forecasts via OpenWeatherMap API  
**Multi-Location Support:** Save multiple locations with persistent storage  
**Offline Functionality:** AsyncStorage maintains recent weather data  
**Interactive UI:** Touch gestures, smooth animations, responsive components  
**System Integration:** Push notifications for weather alerts and updates

---

## **Project Structure & Task Distribution**

```
WeatherDashboard/
├── App.js                 # Main application entry
├── screens/
│   ├── HomeScreen.js      # Weather display (Anupa)
│   ├── DetailsScreen.js   # Detailed forecast (Harry) 
│   └── SettingsScreen.js  # Location management (Raj)
├── components/
│   ├── WeatherCard.js     # Weather info component (Anupa)
│   ├── LocationModal.js   # Location selection (Raj)
│   └── NavigationBar.js   # Bottom navigation (Kerlan)
├── services/
│   └── weatherAPI.js      # OpenWeatherMap integration (Anupa)
└── styles/
    └── globalStyles.js    # Consistent styling (All)
```

### **Individual Developer Assignments**

**Anupa Ragoonanan:** OpenWeatherMap API integration, weather data fetching, HomeScreen development, AsyncStorage implementation for offline capability

**Harry Joseph:** DetailsScreen implementation, interactive touch components, gesture handling, pull-to-refresh functionality, animation systems

**Raj Patel:** Modal components, push notification setup, SettingsScreen creation, location management, micro-interactions and visual polish

**Kerlan Augustine:** React Navigation setup, screen integration, project management, documentation, testing coordination, video presentation

---

## **Development Timeline & Submission Requirements**

### **Phase 1 - Project Planning (Due: November 23, 2025)**
- **Current Deliverable:** Two-page technical documentation with cover page, purpose, functionalities, structure, and task distribution
- **Format:** Professional document suitable for academic submission
- **Responsibility:** Team collaboration led by Kerlan Augustine

### **Phase 2 - Development (Due: December 1, 2025)**
- Individual component development by assigned developers
- API integration and testing phases
- **Deliverable:** Working application with documentation

### **Phase 3 - Final Submission**
- **a.** Complete project files (`CPAN_213_Group14_Project.zip`)
- **b.** Task distribution documentation with individual contributions
- **c.** 15-minute video presentation (all team members)
- **d.** Individual conclusion reports (1 page each, excluding cover page)

<div align="center" style="margin-top: 20px;">

---

**Weather Dashboard Development Team 14**  
**CPAN 213 - Mobile App Development Project**

</div>