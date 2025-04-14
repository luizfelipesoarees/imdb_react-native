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

export default class Main extends Component {
  state = {
    newMovie: "",
    movies: [],
    loading: false,
  };

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

  handleAddMovie = async () => {
    try {
      const { movies, newMovie } = this.state;
      if (!newMovie.trim()) return;
      this.setState({ loading: true });

      const response = await api.get("/", {
        params: {
          t: newMovie,
        },
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

        <List
          data={movies}
          keyExtractor={(movie) => movie.imdbID}
          renderItem={({ item }) => (
            <FilmesContainer> // ALTERAR AQUI
              <Avatar source={{ uri: item.poster }} />
              <Name>{item.title}</Name>
              <Bio>{item.year}</Bio>

              <TouchableOpacity
                style={{
                  backgroundColor: "#e50914",
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
