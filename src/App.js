import "./App.css";

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

function Cell({ color, data }) {
  return <div className={`cell ${color}`}>{data}</div>;
}

function Gamefield() {
  const cells = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => {})
  );

  return (
    <div className="gamefield">
      {cells.map((row, rowindex) => {
        return row.map((cell, cellindex) => {
          if (rowindex % 2 === 0) {
            return cellindex % 2 === 0 ? (
              <Cell key={cellindex} color={"white"} />
            ) : (
              <Cell key={cellindex} color={"black"} />
            );
          }else{
            return cellindex % 2 !== 0 ? (
              <Cell key={cellindex} color={"white"} />
            ) : (
              <Cell key={cellindex} color={"black"} />
            );
          }
        });
      })}
    </div>
  );
}

function Main() {
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
    <div className="App">
      <div className="header">
        <h1>React Knight Travails</h1>
      </div>
      <Main />
    </div>
  );
}

export default App;
