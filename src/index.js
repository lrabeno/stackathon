// import { render } from 'react-dom';
// import React from 'react';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';

// render(
//   <Router>
//     <App />
//   </Router>,
//   document.querySelector('#root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
