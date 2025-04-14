import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #0c0b00; /* fundo preto */
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #444; /* linha sutil */
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#ccc", // cinza claro para contraste no fundo escuro
})`
  flex: 1;
  height: 40px;
  background: #222; /* cinza escuro */
  color: #fff; /* texto branco */
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #555; /* borda discreta */
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #deb522; 
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const FilmesContainer = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 4px;
  background: #111; /* fundo escuro para imagens */
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #fcf7f7; /* texto branco */
  font-weight: bold;
  margin-top: 8px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  color: #ccc; /* cinza claro */
  margin-top: 4px;
  text-align: center;
`;

export const InfoBox = styled.View`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #111;
`;

export const InfoTitle = styled.Text`
  font-size: 14px;
  color: #deb522;
  font-weight: bold;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-top: 4px;
`;

export const Header = styled.View`
  padding-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const Avatarperfil = styled.Image`
  width: 100px;
  height: 150px;
  background: #eee;
`;

export const Nameperfil = styled.Text`
  font-size: 16px;
  color: #fcf7f7;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const BioPerfil = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;