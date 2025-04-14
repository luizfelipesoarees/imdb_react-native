import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/main";
import Login from "./pages/login";
import CadastrarUsuario from "./pages/cadastro";
import Filme from "./pages/filme"; 
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "LOGIN - IMDB React Native",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#deb522",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="CadastrarUsuario"
        component={CadastrarUsuario}
        options={{
          title: "CADASTRO - IMDB React Native",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#deb522",
          },
          headerTitleStyle: {
            color: "#fcf7f7",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={({ navigation }) => ({
          headerLeft: null,
          title: "IMDB React Native - OMDb FILMES API",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#deb522",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 15 }}
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                } catch (error) {
                  console.error("Erro ao realizar o logout:", error);
                }
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Filme"
        component={Filme} // Atualizado aqui
        options={{
          title: "DETALHES DO FILME",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#deb522",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
