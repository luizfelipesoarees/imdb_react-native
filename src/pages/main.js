import React, { Component } from "react";
import {
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  FilmesContainer,
  Avatar,
  Name,
  Bio,
} from "../styles";

// Componente principal da tela "Main"
export default class Main extends Component {
  state = {
    newMovie: "",     // Armazena o texto de busca
    movies: [],       // Lista de filmes 
    loading: false,   // Estado de carregamento da busca
  };

  // Filmes salvos no AsyncStorage
  async componentDidMount() {
    const movies = await AsyncStorage.getItem("movies");
    if (movies) {
      this.setState({ movies: JSON.parse(movies) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { movies } = this.state;
    if (prevState.movies !== movies) {
      AsyncStorage.setItem("movies", JSON.stringify(movies));
    }
  }

  // Adiciona um filme
  handleAddMovie = async () => {
    try {
      const { movies, newMovie } = this.state;
      if (!newMovie.trim()) return; 
      this.setState({ loading: true });

      const response = await api.get("/", {
        params: { t: newMovie },
      });

      if (response.data.Response === "False") {
        alert("Filme não encontrado!");
        this.setState({ loading: false });
        return;
      }

      if (movies.find((movie) => movie.imdbID === response.data.imdbID)) {
        alert("Filme já adicionado!");
        this.setState({ loading: false });
        return;
      }

      // Objeto do filme
      const data = {
        title: response.data.Title,
        year: response.data.Year,
        poster: response.data.Poster,
        imdbID: response.data.imdbID,
      };

      this.setState({
        movies: [...movies, data],
        newMovie: "",
        loading: false,
      });

      Keyboard.dismiss(); 
    } catch (error) {
      alert("Erro ao buscar o filme.");
      this.setState({ loading: false });
    }
  };

  handleDeleteMovie = (imdbID) => {
    const { movies } = this.state;
    const updatedMovies = movies.filter((movie) => movie.imdbID !== imdbID);
    this.setState({ movies: updatedMovies });
  };

  handleMovieDetails = (movie) => {
    this.props.navigation.navigate("Filme", { movie });
  };

  render() {
    const { movies, newMovie, loading } = this.state;

    return (
      <Container>
        {/* Campo de busca */}
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar filme por título"
            value={newMovie}
            onChangeText={(text) => this.setState({ newMovie: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddMovie}
          />
          <SubmitButton loading={loading} onPress={this.handleAddMovie}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        {/* Lista de filmes */}
        <List
          data={movies}
          keyExtractor={(movie) => movie.imdbID}
          renderItem={({ item }) => (
            <FilmesContainer> {/* Renderiza cada filme */}
              <Avatar source={{ uri: item.poster }} />
              <Name>{item.title}</Name>
              <Bio>{item.year}</Bio>

              {/* Botão para ver detalhes */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#deb522",
                  borderRadius: 4,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginTop: 8,
                }}
                onPress={() => this.handleMovieDetails(item)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  VER DETALHES
                </Text>
              </TouchableOpacity>

              {/* Botão para excluir o filme */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#444",
                  borderRadius: 4,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginTop: 8,
                }}
                onPress={() => this.handleDeleteMovie(item.imdbID)}
              >
                <Text style={{ color: "#fff" }}>EXCLUIR</Text>
              </TouchableOpacity>
            </FilmesContainer>
          )}
        />
      </Container>
    );
  }
}
