// Importa as bibliotecas necessárias
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from 'react-native';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

// Componente de cadastro
export default class CadastrarUsuario extends Component {
  // Campos do formulário
  state = {
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
    curso: "",
    password: "",
  };

  // Função de cadastro do usuário
  handleCadastro = async () => {
    const { nome, telefone, cpf, email, curso, password } = this.state;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !telefone || !cpf || !email || !curso || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // Objeto do usuário
    const user = {
      nome,
      telefone,
      cpf,
      email,
      curso,
      password,
    };

    // Salva o usuário no armazenamento local
    await AsyncStorage.setItem("user", JSON.stringify(user));

    // Mensagem de login
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("Login");
  };

  // Renderiza a interface
  render() {
    return (
      <View style={styles.container}>
        {/* Logo do IMDB */}
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' }} 
          style={{ width: 300, height: undefined, aspectRatio: 575 / 290 }}
          resizeMode="contain"
        />
        
        {/* Campos do formulário */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={this.state.nome}
          onChangeText={(nome) => this.setState({ nome })}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={this.state.telefone}
          onChangeText={(telefone) => this.setState({ telefone })}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          value={this.state.cpf}
          onChangeText={(cpf) => this.setState({ cpf })}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={this.state.curso}
          onChangeText={(curso) => this.setState({ curso })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />

        {/* Botão de cadastro */}
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    marginTop: 10,
  },
  buttonText: {
    color: "#fcf7f7", 
    fontWeight: "bold",
  },
});
