import { useState } from "react";
import "./App.css";
import {
  deepCopy,
  delayedMoves,
  getMovesArray,
  itemExists,
  getReadablePos,
  handle,
} from "./javascript/functions";
import knight from "./images/knight.svg";
import _Knight from "./javascript/back";

const board = new _Knight(8); 

function Letters() {
  const letters = Array.from({ length: 8 }, (_, index) =>
    String.fromCharCode(index + 97)
  );
  return (
    <div className="letters">
      {letters.map((number, index) => {
        return (
          <div className="letter" key={index}>
            {number}
          </div>
        );
      })}
    </div>
  );
}

function Numbers() {
  const numbers = Array.from({ length: 8 }, (_, index) => 8 - index);

  return (
    <div className="numbers">
      {numbers.map((number, index) => {
        return (
          <div className="number" key={index}>
            {number}
          </div>
        );
      })}
    </div>
  );
}

function Cell({ color, data, onclk }) {
  return (
    <div className={`cell ${color}`} onClick={onclk}>
      {data}
    </div>
  );
}

function Knight({ imgUrl, animation }) {
  return (
    <img
      src={imgUrl}
      alt="Knight"
      style={{
        width: "75%",
        height: "75%",
      }}
      className={animation}
    />
  );
}

function Target() {
  return <div className="target"></div>;
}

function Gamefield({ position, setPosition, setKnightAdded, data, setData }) {
  const onCellClick = (x, y) => {
    if (!itemExists(Knight, data)) {
      setPosition((prev) => ({ ...prev, start: [x, y] }));
      data[x][y] = <Knight imgUrl={knight} />;
      setData(deepCopy(data));

    } else if (!itemExists(Target, data) && !data[x][y]) {
      setPosition((prev) => ({ ...prev, end: [x, y] }));
      data[x][y] = <Target />;
      setData(deepCopy(data));
      setKnightAdded(true);

    } else {
      console.log("Error!");
      return;
    }
  };

  const cellsDOM = data.map((row, rowindex) => {
    return row.map((cell, cellindex) => {
      if (rowindex % 2 === 0) {
        return cellindex % 2 === 0 ? (
          <Cell
            key={cellindex}
            color={"white"}
            onclk={() => onCellClick(rowindex, cellindex)}
            data={data[rowindex][cellindex]}
          />
        ) : (
          <Cell
            key={cellindex}
            color={"black"}
            onclk={() => onCellClick(rowindex, cellindex)}
            data={data[rowindex][cellindex]}
          />
        );
      } else {
        return cellindex % 2 !== 0 ? (
          <Cell
            key={cellindex}
            color={"white"}
            onclk={() => onCellClick(rowindex, cellindex)}
            data={data[rowindex][cellindex]}
          />
        ) : (
          <Cell
            key={cellindex}
            color={"black"}
            onclk={() => onCellClick(rowindex, cellindex)}
            data={data[rowindex][cellindex]}
          />
        );
      }
    });
  });

  return <div className="gamefield">{cellsDOM}</div>;
}

function Menu({ knightAdded, position, data, setData, emptyData }) {
  const [moves, setMoves] = useState(null);

  const readableStart = position.start && getReadablePos(position.start);
  const readableEnd = position.end && getReadablePos(position.end);

  const onMoveClick = () => {
    if (!position.start || !position.end) return;
    else {
      const movesQueue = board.knightMoves(position.start, position.end)
  
      delayedMoves(movesQueue, 4000, handle, data, setData, Knight, knight)   
    }
  };

  function KnightAdded({ start, end }) {
    return (
      <>
        <div>
          From: <span>{start}</span> To: <span>{end}</span>
        </div>
        <div>Use Move button to move knight!</div>
      </>
    );
  }

  function KnightNotAdeed() {
    return (
      <>
        <div>Please add start and end positions!</div>
        <div>You cant use Move button before you do</div>
      </>
    );
  }

  function Path({ moves }) {
    return (
      <div>
        You made it in {moves.length} moves! Path:
        {moves.map((item) => JSON.stringify(item))}
      </div>
    );
  }

  return (
    <div className="menu">
      <h3>Move knight</h3>
      {knightAdded ? (
        <KnightAdded start={readableStart} end={readableEnd} />
      ) : (
        <KnightNotAdeed />
      )}
      <button onClick={onMoveClick} className="move-btn">
        Move
      </button>
    </div>
  );
}

function Main({ position, setPosition, setKnightAdded, setData, data }) {
  return (
    <div className="main">
      <Letters />
      <Numbers />
      <Gamefield
        position={position}
        setPosition={setPosition}
        setKnightAdded={setKnightAdded}
        setData={setData}
        data={data}
      />
    </div>
  );
}

function App() {
  const emptyData = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => {})
  );
  const [data, setData] = useState(emptyData);
  const [position, setPosition] = useState({
    start: null,
    end: null,
  });
  const [knightAdded, setKnightAdded] = useState(false);

  return (
    <div className="App">
      <div className="header">
        <h1>React Knight Travails</h1>
      </div>
      <Main
        position={position}
        setPosition={setPosition}
        setKnightAdded={setKnightAdded}
        data={data}
        setData={setData}
      />
      <Menu
        knightAdded={knightAdded}
        position={position}
        data={data}
        setData={setData}
        emptyData={emptyData}
      />
      <div className="footer">@cryptoretard</div>
    </div>
  );
}

export default App;
