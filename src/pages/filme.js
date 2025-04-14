import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import api from "../services/api"; 
import {
  Container,
  Header,
  Avatarperfil,
  Nameperfil,
  BioPerfil,
  InfoBox,
  InfoTitle,
  InfoValue,
} from "../styles"; 
import { ScrollView } from "react-native-gesture-handler";

// Componente detalhes do filme
export default class Filme extends Component {
  state = {
    loading: true, 
    movieDetails: {}, 
  };

  // Busca os dados do filme pela API
  async componentDidMount() {
    const { movie } = this.props.route.params; 
    console.log("Movie", movie);

    try {
      const response = await api.get("/", {
        params: {
          i: movie.imdbID, 
        },
      });

      console.log("FILME: ", response.data);

      this.setState({ movieDetails: response.data, loading: false });
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { movieDetails, loading } = this.state;

    if (loading) {
      return (
        <Container style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#deb522" />
        </Container>
      );
    }

    // Detalhes do filme
    return (
      <ScrollView style={{paddingBottom:10, backgroundColor: "black"}}>
        <Container>
          <Header>
            <Avatarperfil source={{ uri: movieDetails.Poster }} />
            <Nameperfil>{movieDetails.Title}</Nameperfil>
            <BioPerfil>{movieDetails.Genre}</BioPerfil>
          </Header>

          <InfoBox>
            <InfoTitle>Ano de Lançamento:</InfoTitle>
            <InfoValue>{movieDetails.Year}</InfoValue>
          </InfoBox>

          <InfoBox>
            <InfoTitle>Data de Lançamento:</InfoTitle>
            <InfoValue>{movieDetails.Released}</InfoValue>
          </InfoBox>

          <InfoBox>
            <InfoTitle>País:</InfoTitle>
            <InfoValue>{movieDetails.Country}</InfoValue>
          </InfoBox>

          <InfoBox>
            <InfoTitle>Prêmios:</InfoTitle>
            <InfoValue>{movieDetails.Awards}</InfoValue>
          </InfoBox>

          <InfoBox>
            <InfoTitle>IMDb Rating:</InfoTitle>
            <InfoValue>{movieDetails.imdbRating}</InfoValue>
          </InfoBox>
        </Container>
      </ScrollView>
    );
  }
}
