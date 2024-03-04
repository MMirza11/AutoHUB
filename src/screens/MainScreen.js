import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  const navigation = useNavigation();

  const [images, setImages] = useState([
    {
      id: "1",
      uri: "https://images.pexels.com/photos/12040980/pexels-photo-12040980.jpeg",
      caption: "m4 f82",
    },
    {
      id: "2",
      uri: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      caption: "r8 type 42",
    },
  ]);

  const addImage = (imageUri) => {
    console.log(imageUri); // Debugging: Log the URI to see what it looks like
    Alert.prompt(
      "New Image",
      "Enter a caption for this image:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (caption) =>
            setImages((currentImages) => [
              {
                id: String(currentImages.length + 1),
                uri: imageUri.startsWith("file://")
                  ? imageUri
                  : `file://${imageUri}`,
                caption: caption || "No caption",
              },
              ...currentImages,
            ]),
        },
      ],
      "plain-text"
    );
  };

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      addImage(result.assets[0].uri);
    } else {
      console.log("No image selected or missing URI:", result);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      addImage(result.assets[0].uri);
    } else {
      console.log("No image captured or missing URI:", result);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>AUTOHUB</Text>
          <Text style={styles.taglineText}>FUELING CAR CONVERSATIONS</Text>
          <View style={styles.buttonContainer}>
            <Button title="Upload Image" onPress={handleChoosePhoto} />
            <Button title="Take Photo" onPress={handleTakePhoto} />
            <Button
              title="Go to Profile"
              onPress={() => navigation.navigate("Profile")}
            />
          </View>
        </View>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContentContainer}
        />
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("ProfileScreen", {
                username: "YourUsername",
                name: "YourName",
                images: images,
              })
            }
          >
            <Text style={styles.navText}>Discussions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
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
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taglineText: {
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "#f8f8f8",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 18,
  },
});

export default MainScreen;
