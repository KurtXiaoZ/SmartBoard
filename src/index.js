import React from 'react';
import ReactDOM from 'react-dom/client';
import { Item } from './components/Item';
import { SmartBoard } from './components/SmartBoard';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SmartBoard className="smartboard">
    <Item
      x={30}
      y={50}
    >
      <div
        style={{
          border: '1px solid blue',
          width: '100px'
        }}
      >awoiejfio</div>
    </Item>
  </SmartBoard>
);
