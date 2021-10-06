import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import Landing from './component/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from './views/DashBoard'
import About from './views/About'
import ProtectedRoute from './component/routing/ProtectedRoute'

function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route
						exact
						path='/login'
						render={props => <Auth {...props} authRoute='login' />}
					/>
					<Route
						exact
						path='/register'
						render={props => <Auth {...props} authRoute='register' />}
					/>
					<ProtectedRoute exact path='/dashboard' component={DashBoard} />
					<ProtectedRoute exact path='/about' component={About} />
				</Switch>
			</Router>
		</AuthContextProvider>
	)
}

export default App
