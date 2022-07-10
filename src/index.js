import React from 'react';
import ReactDOM from 'react-dom/client';
import { Item } from './components/Item';
import { SmartBoard } from './components/SmartBoard';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SmartBoard 
    className={"smartboard"}
  >
    <Item
      // left={200}
      // top={200}
      itemId={'item1'}
      style={{
        zIndex: '51'
      }}
      bounds={{left: 30, top: 30, right: 400, bottom: 400}}
      onDrag={(event, data) => console.log(data)}
    >
      <div
        style={{
          // border: '1px solid blue',
          width: '100px',
          background: 'red',
        }}
      >awoiejfio</div>
      </Item>
    <Item
      left={400}
      top={400}
      itemId={'item2'}
    >
      <div
        style={{
          width: '150px',
          background: 'blue',
        }}
      >awoiejfio</div>
    </Item>
    <Item
      left={300}
      top={300}
      itemId={'item3'}
    >
      <div
        style={{
          width: '130px',
          background: 'yellow',
        }}
      >awoiejfio</div>
      </Item>
  </SmartBoard>
);
