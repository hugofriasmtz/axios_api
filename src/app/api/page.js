
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/character`);
    console.log("Datos obtenidos exitosamente:", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

export const createCharacter = async (characterData) => {
  try {
    const response = await axios.post(`${BASE_URL}/character`, characterData);
    console.log("Personaje creado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el personaje:", error);
    throw error;
  }
};

export const updateCharacter = async (characterId, characterData) => {
  try {
    const response = await axios.put(`${BASE_URL}/character/${characterId}`, characterData);
    console.log("Personaje actualizado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el personaje:", error);
    throw error;
  }
};

export const deleteCharacter = async (characterId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/character/${characterId}`);
    console.log("Personaje eliminado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el personaje:", error);
    throw error;
  }
};
