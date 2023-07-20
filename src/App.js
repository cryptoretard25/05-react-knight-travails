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

function Cell({color, data}){
  return <div className={`cell ${color}}`}>{data}</div>;
}

function Gamefield() {
  const cells = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => {
      return <div className="cell"></div>;
    })
  );

  console.log(cells);

  return (
    <div className="gamefield">
      {cells.map((row, index) => {
        row.map((cell, index) => {
          if(row%2===0){
            return cell % 2 === 0 ? (
              <div className="cell"></div>
            ) : (
              <div className="cell black"></div>
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
