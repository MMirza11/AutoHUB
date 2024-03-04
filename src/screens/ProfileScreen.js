import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import users from "../data/UserInfo";
const ProfileScreen = ({ route }) => {
  const { username } = route.params;

  // Find the user by username. Adjust this as necessary, e.g., if using user ID.
  const user = users.find((user) => user.username === username);

  // If the user is not found, you can return null or some placeholder content
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Username: {user.username}</Text>
      <Text style={styles.infoText}>Name: {user.name}</Text>
      <FlatList
        data={user.images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  infoText: {
    fontSize: 18,
    margin: 10,
    color: "gray",
  },
  listContentContainer: {
    paddingBottom: 60,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  caption: {
    marginTop: 5,
    color: "gray",
  },
});

export default ProfileScreen;
