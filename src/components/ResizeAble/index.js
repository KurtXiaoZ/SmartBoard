import { useState } from "react";
import { Resizable } from "react-resizable";
/*
export function ResizeAble(props) {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(50);
    const onResize = (event, {element, size, handle}) => {
        console.log('resize');
        setWidth(size.width);
        setHeight(size.height);
    }
    return <Resizable
        width={width}
        height={height}
        onResize={onResize}
        resizeHandles={['se']}
    >
        <div
            style={{
                border: '1px solid black',
                width: `${width}px`,
                height: `${height}px`,
            }}
        ><span>Resize!!!</span></div>
    </Resizable>
}*/

// ES6
import { ResizableBox } from 'react-resizable';
import React from "react";

export class ResizeAble extends React.Component {
  render() {
    return (
      <ResizableBox width={200} height={200}
          minConstraints={[100, 100]} maxConstraints={[300, 300]}>
        <span>Contents</span>
      </ResizableBox>
    );
  }
}