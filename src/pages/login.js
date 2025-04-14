import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Componente de Login
const Login = () => {
  // Campos de email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // Validar o login
  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      alert("Nenhum usuário cadastrado!");
      return;
    }

    const userJson = JSON.parse(user);
    if (userJson.email === email && userJson.password === password) {
      navigation.navigate("Main"); 
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  
  const handleCadastro = () => {
    navigation.navigate("CadastrarUsuario");
  };

  // Interface da tela de login
  return (
    <View style={styles.container}>
      {/* Logo do IMDB */}
      <Image 
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' }} 
        style={{ width: 300, height: undefined, aspectRatio: 575 / 290 }}
        resizeMode="contain"
      />

      {/* Campos de login */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#555"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Botões de ação */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c0b00", 
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 1,
    borderColor: "#deb522",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#deb522",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fcf7f7",
    fontWeight: "bold",
  },
});

export default Login;
