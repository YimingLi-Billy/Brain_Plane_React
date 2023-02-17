import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import Level1 from './levels/level1.jsx';

const container = document.getElementById('app');
const root = createRoot(container);


function App() {
  return (<div>
    {<Level1 />}
  </div>);
};


root.render(<App />);