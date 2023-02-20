import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import H4 from './components/H4';
import { Search } from './containers/search/Search';
import { ActionsRow } from './components/ActionsRow';
import { TournamentsList } from './containers/tournamentsList/TournamentsList';
import { TournamentCreateBtn } from './containers/tournamentCreateBtn/TournamentCreateBtn';
import { StatusInfo } from './containers/statusInfo/StatusInfo';

const App = () => {
  return (
    <Container>
      <header>
        <H4>FACEIT Tournaments</H4>
        <ActionsRow>
          <Search />
          <TournamentCreateBtn />
        </ActionsRow>
      </header>
      <main>
        <StatusInfo />
        <TournamentsList />
      </main>
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
