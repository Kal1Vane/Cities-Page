import Login from './login';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
describe('Component: Login', () => {
  it('should render "Login" when user navigate to "login" url', () => {
    const store = mockStore({});
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test.ru@test');
    userEvent.type(screen.getByPlaceholderText(/Password/i), '12345');

    expect(screen.getByDisplayValue(/test.ru@test/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/12345/i)).toBeInTheDocument();
  });
});
