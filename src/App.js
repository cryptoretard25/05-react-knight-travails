import { useContext } from "react";
import "./App.css";
import { delay, deepCopy, delayedMoves, itemExists, getReadablePos, handle, removeNumbers, } from "./javascript/functions";
import knight from "./images/knight.svg";
import _Knight from "./javascript/back";
import { GlobalStateContest, GlobalStateProvider, emptyData, emptyAlert, emptyPosition, } from "./globalState";

const board = new _Knight(8);

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

function AlertDiv({ data }) {
  return <div className="alert-div">Alert: {data}!</div>;
}

function Gamefield() {
  const {
    showAlert,
    setShowAlert,
    data,
    setData,
    setKnightAdded,
    blockCells,
    position,
    setPosition,
  } = useContext(GlobalStateContest);

  const onCellClick = async (x, y) => {
    if (blockCells) {
      setShowAlert({ data: "You cant do it now!", state: true });
      await delay(3000);
      setShowAlert(emptyAlert);
      return;
    }
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
      setShowAlert({
        data: "Knight and target cell position added, time to move",
        state: true,
      });
      await delay(3000);
      setShowAlert(emptyAlert);
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

  return (
    <>
      <div className="gamefield">{cellsDOM}</div>
      {showAlert.state ? <AlertDiv data={showAlert.data} /> : null}
    </>
  );
}

function Menu() {
  const {
    knightAdded,
    setKnightAdded,
    showAlert,
    setShowAlert,
    data,
    setData,
    blockCells,
    setBlockCells,
    position,
    setPosition,
  } = useContext(GlobalStateContest);

  const readableStart = position.start && getReadablePos(position.start);
  const readableEnd = position.end && getReadablePos(position.end);
  const emptyAlert = { data: "", state: false };

  const onMoveClick = async () => {
    if (blockCells) {
      return;
    }
    if (
      !position.start ||
      !position.end ||
      JSON.stringify(position.start) === JSON.stringify(position.end)
    ) {
      setShowAlert({ data: "Set knight positions properly", state: true });
      await delay(3000);
      setShowAlert(emptyAlert);
      return;
    } else {
      removeNumbers(data);
      setBlockCells(true);
      const movesQueue = board.knightMoves(position.start, position.end);
      await delayedMoves(
        movesQueue,
        3000,
        handle,
        data,
        setData,
        Knight,
        knight,
        setPosition
      );
      setBlockCells(false);
    }
  };

  const onRestartClick = () => {
    if (blockCells) return;
    setData(deepCopy(emptyData));
    setPosition(deepCopy(emptyPosition));
    setKnightAdded(false);
    
  };

console.log(data);

  function MoveButton({ onMoveClick }) {
    return (
      <button onClick={onMoveClick} className="btn move-btn">
        Move
      </button>
    );
  }

  function RestartButton({ onRestartClick }) {
    return (
      <button onClick={onRestartClick} className="btn restart-btn">
        Restart
      </button>
    );
  }

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

  return (
    <div className="menu">
      <h3>Move knight</h3>
      {knightAdded ? (
        !blockCells ? (
          <KnightAdded start={readableStart} end={readableEnd} />
        ) : (
          <>
            <div>Knight moving...</div>
            <div>You cant do anything now</div>
          </>
        )
      ) : (
        <KnightNotAdeed />
      )}
      <div style={{ display: "flex", gap: "1rem" }}>
        <MoveButton onMoveClick={onMoveClick} />
        <RestartButton onRestartClick={onRestartClick} />
      </div>
      {showAlert.state ? <AlertDiv data={showAlert.data} /> : null}
    </div>
  );
}

function Main() {
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

  return (
    <div className="main">
      <Letters />
      <Numbers />
      <Gamefield />
    </div>
  );
}

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <div className="header">
          <h1>React Knight Travails</h1>
        </div>
        <Main />
        <Menu />
        <div className="footer">@cryptoretard</div>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
