import { Route, Routes } from 'react-router-dom';

import Container from 'components/Container';

import SongPage from 'pages/SongPage';
import SongsPage from 'pages/SongsPage/SongsPage';

import './styles/app.scss';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<SongsPage />} />
          <Route path="songs/:id" element={<SongPage />} />
          <Route path="*" element={<SongsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
