import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/main";
import Login from "./pages/login";
import CadastrarUsuario from "./pages/cadastro";
import Filme from "./pages/filme"; // Atualizado aqui
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
          title: "LOGIN",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#7159c1",
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
          title: "CADASTRO DE USUÁRIOS",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#7159c1",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={({ navigation }) => ({
          headerLeft: null,
          title: "OMDb FILMES",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#3498db",
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
            backgroundColor: "#e50914",
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
