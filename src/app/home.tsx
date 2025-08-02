import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Alert,
} from "react-native";
import { styles } from "../styles/homeStyles";
import { colors } from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const [selectedDays, setSelectedDays] = useState({
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false,
    dom: false,
  });

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [vezesNaoFumou, setVezesNaoFumou] = useState(0);
  const [ultimaResistencia, setUltimaResistencia] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuarioJson = await AsyncStorage.getItem("usuario");
        if (usuarioJson) {
          const usuario = JSON.parse(usuarioJson);
          setNomeUsuario(usuario.nome || "");
        }

        const contagem = await AsyncStorage.getItem("vezesNaoFumou");
        if (contagem) setVezesNaoFumou(parseInt(contagem));

        const data = await AsyncStorage.getItem("ultimaResistencia");
        if (data) setUltimaResistencia(data);

        const imagemSalva = await AsyncStorage.getItem("imagemUsuario");
        if (imagemSalva) setUserImage(imagemSalva);
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
      }
    }
    carregarDados();
  }, []);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da sua permissão para acessar a galeria."
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      const imagemSelecionada = resultado.assets[0].uri;
      setUserImage(imagemSelecionada);
      await AsyncStorage.setItem("imagemUsuario", imagemSelecionada);
    }
  };

  const toggleDaySelection = (day: keyof typeof selectedDays) => {
    Vibration.vibrate(50);
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const renderDayIcon = (day: keyof typeof selectedDays) => {
    const isSelected = selectedDays[day];
    return (
      <TouchableOpacity onPress={() => toggleDaySelection(day)}>
        <MaterialIcons
          name="check-box"
          size={40}
          style={[
            styles.weekIcons,
            {
              backgroundColor: isSelected ? "white" : "transparent",
              borderRadius: 5,
              color: isSelected ? "green" : "black",
              textAlign: "center",
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const handleQueroFumar = async () => {
    try {
      const novaContagem = vezesNaoFumou + 1;
      setVezesNaoFumou(novaContagem);
      await AsyncStorage.setItem("vezesNaoFumou", novaContagem.toString());

      const agora = new Date();
      const dataFormatada = agora.toLocaleDateString("pt-BR");
      const horaFormatada = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dataHora = `${dataFormatada} às ${horaFormatada}`;

      setUltimaResistencia(dataHora);
      await AsyncStorage.setItem("ultimaResistencia", dataHora);

      router.push("/breathingCircle");
    } catch (error) {
      console.log("Erro ao atualizar contagem ou data:", error);
    }
  };

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={styles.container}
    >
      <View style={styles.informations}>
        <Image
          source={require("../assets/images/appLogo.png")}
          style={styles.appLogo}
        />

        <TouchableOpacity onPress={escolherImagem}>
          <Image
            source={
              userImage
                ? { uri: userImage }
                : require("../assets/images/userLogo.png")
            }
            style={styles.userLogo}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.userTextContainer}>
        <Text style={styles.userText}>Bem-vindo {nomeUsuario}</Text>
      </View>

      <View style={styles.weekControlContainer}>
        <Text style={styles.weekText}>Controle da semana</Text>
        <Text style={styles.weekTextTwo}>Dias que você deixou de fumar</Text>

        <View style={styles.calendarDays}>
          {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map((day) => (
            <Text key={day} style={styles.calendarDaysText}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Text>
          ))}
        </View>

        <View style={styles.calendar}>
          {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map((day) => (
            <View key={day} style={{ flex: 1, alignItems: "center" }}>
              {renderDayIcon(day as keyof typeof selectedDays)}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.noSmokeContainer}>
        <Text style={styles.noSmokeText}>Vezes que deixou de fumar</Text>
        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
          {vezesNaoFumou}
        </Text>

        {ultimaResistencia ? (
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginTop: 8,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Última resistência: {ultimaResistencia}
          </Text>
        ) : null}

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/NoSmokeLogo.png")}
            style={styles.noSmokeImage}
          />
        </View>
      </View>

      <View style={styles.smokeButtonContainer}>
        <Pressable onPress={handleQueroFumar}>
          <Text style={styles.smokeButtonText}>Quero Fumar!</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
