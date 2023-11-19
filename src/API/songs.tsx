import { SongState } from 'models/songs/types';

export async function getSongsApi() {
  return await fetch('http://localhost:3001/songs');
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
  const response = await fetch(`http://localhost:3001/songs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const editSongApi = async (
  id: number,
  updatedData: Partial<SongState>
) => {
  const response = await fetch(`http://localhost:3001/songs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  return response;
};

export const deleteSongApi = async (id: number) => {
  const response = await fetch(`http://localhost:3001/songs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
