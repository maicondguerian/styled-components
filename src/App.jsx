import {  useState } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { Header } from "./components/header/Header.style"
import { theme, darkThemeColor } from "./theme/theme"
import { Container } from "./container/Div.style";
import { SearchBar } from "./components/search/Input";
import { Content } from "./components/content/Content";
import { MyContext } from "./context/Mycontext";
import { TfiBook } from "react-icons/tfi";
import {  HiMoon, HiOutlineSun } from "react-icons/hi";

function App() {
  const [toggleTheme, settoggleTheme] = useState(theme);
  const [keyboard, setKeyboard] = useState('');
  const [wordList, setWordList] = useState([]);
  const [iconTheme, setIconTheme] = useState(toggleTheme === theme ? HiMoon : HiOutlineSun)

  const handleKeyboard = (e) => {
    setKeyboard(e.target.value);
  }

  const handleWord = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyboard}`)
      .then((resp) => resp.json())
      .then(data => {
        setWordList(data);
      })
  }

  const handleTheme = () => {
    if (toggleTheme === theme) {
      settoggleTheme(darkTheme);
      setIconTheme(HiOutlineSun);
    } else {
      settoggleTheme(theme);
      setIconTheme(HiMoon);
    }
  }
  // useEffect(()=> {
  //   console.log(iconTheme)
  // },[toggleTheme])
  const handlekeyBoardEnter = (event) => {
    if (keyboard !== '' && event.key === "Enter"){
      handleWord();
    }else{
      null
    }
  }

  const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      ...darkThemeColor
    }
  }
  const GlobalStyle = createGlobalStyle`
    body{
      background-color: ${props => props.theme.colors.softWhite};
      font-family: 'Roboto Serif', serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      outline: none;
      border: none;
    }
  `

  return (
    <ThemeProvider theme={toggleTheme}>
      <GlobalStyle />
      <MyContext.Provider value={{ handleTheme, handleKeyboard, handleWord, handlekeyBoardEnter, keyboard, wordList, setWordList, handleWord  }}>
        <Container>
          <Header Icon={TfiBook} size={35} color={'#000f'} />
          <SearchBar />
          <Content />
        </Container>
      </MyContext.Provider>
    </ThemeProvider>
  )
}

export default App;

