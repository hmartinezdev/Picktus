import React, { Component } from "react";
import Header from "@components/Header";
import Logo from "@components/Logo";
import colors from "../../constants/colors";

class App extends Component {
  render() {
    return (
      <div className="page">
        <Header />
        <Logo />
        <style jsx>{`
          .page {
            min-height: 100vh;
            background-color: ${colors.main};
          }
          :global(*) {
            padding: 0;
            margin: 0;
          }

          :global(html) {
            font-size: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
