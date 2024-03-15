'use client';

import { useEffect, useState } from 'react';
import { getCharacters, createCharacter, updateCharacter, deleteCharacter } from './api/page';
import { Grid, Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCharacter = async () => {
    try {
      const newCharacterData = {
        name: newCharacterName,
        // Agrega otros campos necesarios
      };

      const newCharacter = await createCharacter(newCharacterData);
      setCharacters([...characters, newCharacter]);
      setNewCharacterName('');
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  const handleUpdateCharacter = async (characterId, updatedName) => {
    try {
      const updatedCharacterData = {
        name: updatedName,
        // Agrega otros campos necesarios
      };

      await updateCharacter(characterId, updatedCharacterData);
      const updatedCharacters = characters.map(character => {
        if (character.id === characterId) {
          return { ...character, name: updatedName };
        }
        return character;
      });
      setCharacters(updatedCharacters);
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await deleteCharacter(characterId);
      const updatedCharacters = characters.filter(character => character.id !== characterId);
      setCharacters(updatedCharacters);
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  return (
    <div>
      <TextField
        label="New Character Name"
        value={newCharacterName}
        onChange={(e) => setNewCharacterName(e.target.value)}
      />
      <Button onClick={handleCreateCharacter}>Add Character</Button>

      <Grid container spacing={2}>
      {characters.map((character) => (
        <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={character.image}
              alt={character.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {character.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {character.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Species: {character.species}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Species: {character.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Species: {character.episode}
              </Typography>
              <Button onClick={() => handleUpdateCharacter(character.id, `${character.name} Updated`)}>
                  Update
                </Button>
                <Button onClick={() => handleDeleteCharacter(character.id)}>
                  Delete
                </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}
