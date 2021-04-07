import React from 'react';
import { Container } from 'semantic-ui-react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route
} from 'react-router-dom';
import OverviewPage from './pages/overview';
import NewItemPage from './pages/newItem';
import Header from './sharedComponents/Header';

const App : React.FC = () => {
        
    return (
        <Router>
            <Container>
                <Header />
                <Switch>
                    <Route path='/new'>
                        <NewItemPage />
                    </Route>
                    <Route path='/'>
                        <OverviewPage />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
