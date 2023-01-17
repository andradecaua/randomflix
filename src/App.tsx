import React, {useState} from 'react';
import logo from  './assets/shuffle.svg'

type filme = [{
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
}]|""

function App() {

  const [filme, setFilme] = useState<filme>()


  function gerarId(){
    const randomizar = Math.random() * 1000
    const numeroFinal = Math.round(randomizar)
    return numeroFinal
  }

  async function getFilme(){
    const apiURL = `https://api.themoviedb.org/3/movie/${gerarId()}?api_key=`.concat(process.env.REACT_APP_API_KEY?process.env.REACT_APP_API_KEY:"")
    await fetch(apiURL)
          .then((response) => response.json())
          .then((value) => {
            const {title, overview, popularity, poster_path} = value
            if(title == undefined || overview == ""){
              getFilme()
            }
            setFilme([{title, overview, popularity, poster_path}])
          })
  }

  return (
    <div className="App">
      <img src={logo} width={130} />
      <h2>Não sabe oque assistir ?</h2>
        {filme != "" && filme?filme?.map(item => {
          const {title, overview, popularity, poster_path} = item
          return(
            <div className='areaApi'  key={0}>
              <h3>{title}</h3>
              <div className="snopse">
                <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/".concat(poster_path)} width={150} height={180} />
                <p>
                  {overview}
                </p>
              </div>
            </div>
          )
        }):""}
        <div className='areabuttons'>
          <button onClick={async () => {
            await getFilme()
          }}><img src={logo} width={35} />Encontrar Filme</button>
          <span>
            Clique em "Encontrar Filmes" que traremos informações de algum filme para você assistir hoje
          </span>
        </div>
    </div>
  );
}

export default App;
