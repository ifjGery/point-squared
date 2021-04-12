import React from 'react';
import { render } from 'react-dom';

import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { api } from './service';
import mockData from './mockData.json';

api.init(mockData);

render(<App />, document.getElementById('root'));
