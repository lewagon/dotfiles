const App = () => {
  const message = "If you see this message in your browser, that means React is successfully mounted! 🙌";

  return (
    <div id="todosContainer">
      {message}
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
