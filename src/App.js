import axios from "axios"
import { useEffect, useState } from "react"
import { ProgressBar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useQuery } from 'react-query'
import './App.css'
import Gallery from './components/Gallery'

function App() {

  const [reload, setReload] = useState(false)

  const callAPI = async () => {
    const data = await axios.get('https://api.imgflip.com/get_memes')
    return data
  }

  let content;
  const { data, error, isError, isLoading } = useQuery('memes', callAPI)
  if (isLoading) content = <ProgressBar animated now={100} label={'Loading...'} />
  else if (isError) content = <Container fluid>{error.message}</Container>
  else content = <Gallery urls={data.data.data.memes.map(meme => meme.url)} cols={4}></Gallery>

  return (
    <>
      <Container fluid>
        <Container fluid style={{ padding: 10 + 'px' }}>
          <Row>
            <Button onClick={() => setReload(!reload)}>Reload</Button>
          </Row>
        </Container>
        {content}
      </Container>
    </>
  )
}

export default App
