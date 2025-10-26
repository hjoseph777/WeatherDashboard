// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';
// import CustomButton from '../components/CustomButton';

// /**
//  * SavedLocationsScreen - Favorite locations list
//  * Developer 4: Navigation & Project Documentation
//  */

// export default function SavedLocationsScreen() {
//   const handleAddLocation = (city) => {
//     Alert.alert(
//       "Add Location",
//       `Do you want to save ${city}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Save", onPress: () => console.log(`${city} saved!`) },
//       ]
//     );
//   };

//   const handleRemoveLocation = (city) => {
//     Alert.alert(
//       "Remove Location",
//       `Are you sure you want to delete ${city}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Remove",
//           onPress: () => console.log(`${city} removed!`),
//           style: "destructive",
//         },
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Saved Locations</Text>

//       <View style={styles.cityItem}>
//         <Text style={styles.cityText}>Toronto</Text>
//         <View style={styles.buttonRow}>
//           <Button
//             title="Add"
//             onPress={() => handleAddLocation("Toronto")}
//             color="#0077b6"
//           />
//           <Button
//             title="Remove"
//             onPress={() => handleRemoveLocation("Toronto")}
//             color="#d62828"
//           />
//         </View>
//       </View>

//       <View style={styles.cityItem}>
//         <Text style={styles.cityText}>New York</Text>
//         <View style={styles.buttonRow}>
//           <Button
//             title="Add"
//             onPress={() => handleAddLocation("New York")}
//             color="#0077b6"
//           />
//           <Button
//             title="Remove"
//             onPress={() => handleRemoveLocation("New York")}
//             color="#d62828"
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f9f9f9",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   cityItem: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   cityText: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     gap: 10,
//   },
// });
