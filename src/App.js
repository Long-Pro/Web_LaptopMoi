// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Link, Outlet  } from "react-router-dom";
import Menu from './components/Menu/Menu'
import Header from './components/Header/Header'

import styles from './App.module.scss';
console.log(styles)
function App() {
  return (
    <div style={{display:'flex'}}>
      <Menu/>
      <div style={{flex:1}}>
        <Header title='DASHBOARD' user={{account:'LongVip'}}/>
        <div className={styles.content}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
