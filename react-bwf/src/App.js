import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import React /* , { useEffect }  */ from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './hooks/useAuth';
//import GroupList from './components/group/group-list';
import Header from './components/layout/header';
import Main from './components/layout/main';
import Sidebar from './components/layout/sidebar';
import theme from './theme';
import {
	BrowserRouter as Router,
	/* useHistory, */
} from 'react-router-dom';

function App() {
	const user = JSON.parse(localStorage.getItem('user-token'));

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider user={user}>
				<div className="App">
					<Router>
						<Header />
						<div className="general-content">
							<Sidebar />
							<Main />
						</div>
					</Router>
				</div>
				<NotificationContainer />
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
