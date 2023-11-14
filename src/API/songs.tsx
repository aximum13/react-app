import { SongState } from 'models/songs/types';

export function getSongsApi() {
  return fetch('http://localhost:3001/songs');
}

export const addSongApi = async (newSongData: SongState) => {
  try {
    const response = await fetch('http://localhost:3001/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSongData),
    });

    return response;
  } catch (error) {
    console.error('Ошибка при создании новой записи:', error);
    throw error;
  }
};

export const getSongApi = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/songs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error(`Ошибка при открытии песни с id ${id}:`, error);
    throw error;
  }
};

export const editSongApi = async (
  id: number,
  updatedData: Partial<SongState>
) => {
  try {
    const response = await fetch(`http://localhost:3001/songs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    return response;
  } catch (error) {
    console.error(`Ошибка при редактировании песни с id ${id}:`, error);
    throw error;
  }
};

export const deleteSongApi = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/songs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error(`Ошибка при удалении записи с id ${id}:`, error);
    throw error;
  }
};
