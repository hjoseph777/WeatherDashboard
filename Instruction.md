# Weather Dashboard - Project Instructions

<div align="center">

## **COVER PAGE**

---

### **Application Name:** Weather Dashboard
### **Group Number:** Group 14
### **Platform:** React Native with Expo CLI

---

### **Group Members**

| **Role** | **Developer** | **Responsibilities** |
|----------|---------------|---------------------|
| **Developer 1** | **Anupa Ragoonanan** | API Integration & Progress Management |
| **Developer 2** | **Harry Joseph** | Interactive Components & Gestures |
| **Developer 3** | **Raj Patel** | Modals, Notifications & Animations |
| **Developer 4** | **Kerlan Augustine** | Navigation & Project Documentation |

---

### **Purpose of the Application**

#### **Who needs your app? And, does "weather" as an application really need to be invented?**

Our Weather Dashboard app fulfills several major demands in today's mobile-first society:

- **Unrestricted Access Need:** Weather information is an indispensable part of daily life planning for all demographics across all geographies
- **Mobile Convenience:** Increasing number of users want to check weather updates in mobile devices
- **Better User Experience:** Conventional weather apps are short of impressive user interfaces – our app will feature easy animations with smooth User Interface
- **Offline Features:** When connectivity is spotty, users still want to be able to access weather information they've recently looked at
- **Location Tool:** Today users are constantly on the move, and wish to monitor the weather at multiple locations easily

#### **Real-world impact:**
- Outdoor activities planning for students on campus
- Professionals scheduling meetings and commutes from home
- Travelers managing itineraries across multiple cities
- Families organizing weekend outings and entertainment

---

</div>

<div style="page-break-before: always;"></div>

---

# **PROJECT DETAILS - PAGE 2**

---

## **Functionalities that we will implement?**

### **Core Weather Features:**
- **Real-time Weather Display:** Current temperature, humidity, wind speed, and conditions with automatic location detection
- **5-Day Forecast:** Extended predictions with daily ranges and precipitation probability
- **Dynamic Animations:** Weather-appropriate animated icons (rain, snow, sunny, cloudy)

### **Interactive Experience:**
- **Touch Interactions:** Custom buttons with haptic feedback and smooth animations
- **Gesture Navigation:** Pull-to-refresh and swipe transitions between screens
- **Progressive Loading:** Visual feedback during API calls with custom spinners

### **Data Management:**
- **Location Management:** Save/organize multiple weather locations
- **Offline Capability:** Local storage for recent weather data access
- **User Preferences:** Persistent app settings and customization options

---

## **General structure of WeatherDashboard?**

```
WeatherDashboard/
├── src/screens/          # HomeScreen, ForecastScreen, SavedLocationsScreen
├── src/components/       # WeatherCard, CustomButton, LoadingSpinner, AnimatedIcon
├── src/services/         # weatherAPI.js, storage.js (API & data persistence)
├── src/navigation/       # AppNavigator.js (React Navigation setup)
└── src/utils/           # constants.js, helpers.js (utilities)
```

---

## **Distribution of functionalities among group members?**

### **Developer 1: Anupa Ragoonanan - API Integration**
- OpenWeatherMap API integration with error handling and validation
- Custom React hooks for weather data management and caching
- Loading spinners and user feedback during API operations
- AsyncStorage wrappers for persistent data and offline capability

### **Developer 2: Harry Joseph - Interactive Components**
- Custom button components with haptic feedback and animations
- Pull-to-refresh functionality and swipe navigation implementation
- Touch responsiveness optimization and reduced latency
- Advanced gesture recognition systems

### **Developer 3: Raj Patel - Animations & Modals**
- Weather-specific animations using React Native's Animated API
- Modal interfaces for detailed weather information and user input
- Notification system for success/error messages and updates
- Visual polish with micro-interactions and transition effects

### **Developer 4: Kerlan Augustine - Navigation & Documentation**
- React Navigation configuration with stack navigation and transitions
- All main application screens development and component integration
- Project coordination, integration testing, and quality assurance
- Documentation preparation and professional video demonstration

---

## **Development Timeline & Project Phases**

### **PHASE 1 - PROJECT PLANNING (Due: Nov 23, 2025)**


- **Deliverable:** Two-page Word document with cover page, purpose, functionalities, structure, and task distribution
- **Responsibility:** Kerlan Augustine leads documentation; all members review

### **PHASE 2 - DEVELOPMENT (Due: Dec 1, 2025)**  


- **Week 1:** Individual component development by each developer
- **Week 2:** Integration testing, performance optimization, quality assurance
- **Deliverable:** Functional application with documentation and testing evidence

### **PHASE 3 - FINAL SUBMISSION**
**Required Submissions:**
- **a.** `CPAN_213_Group14_Project.zip` - Complete project files
- **b.** Task distribution documentation with individual contributions  
- **c.** 5-minute video presentation (all members participate)
- **d.** 1-page project report with individual conclusion sections



**Group 14 - Weather Dashboard Development Team**
