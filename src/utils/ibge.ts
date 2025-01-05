import axios from "axios";
import { states } from "../schemes/states.schemes";

export const fetchStates = async () => {
  try {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    const data = await response.data;
    return data.sort((a: states, b: states) => a.nome.localeCompare(b.nome));
  } catch (error) {
    console.error("Error fetching states:", error);
  }
};

export const fetchCities = async (uf: string) => {
  try {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const data = await response.data;
    return data.sort((a: { nome: string }, b: { nome: string }) =>
      a.nome.localeCompare(b.nome)
    );
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};
