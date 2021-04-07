import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route
} from 'react-router-dom';
import OverviewPage from './pages/overview';
import NewItemPage from './pages/newItem';
import MenuBar from './MenuBar';

const App : React.FC = () => {
        
    return (
        <Router>
            <Container>
                <Header as='h1' content='Point Squared' textAlign='center' />
                <MenuBar />
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
