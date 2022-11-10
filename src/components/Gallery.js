import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { useEffect, useState } from 'react'

function Gallery({ cols, urls }) {

    const [images, setImages] = useState([])

    useEffect(() => {
        const newImages = []
        for (let i = 0; i < urls.length; i += cols) {
            const group = urls.slice(i, i + cols);
            const row =
                <Row key={i} style={{marginBottom: 20 + 'px'}}>
                    {
                        group.map(entry =>
                            <Col key={entry}>
                                <Image src={entry} fluid rounded className='cover'></Image>
                            </Col>)
                    }
                </Row>
            newImages.push(row)
        }
        setImages(newImages)
        return () => { }
    }, [urls])

    return (
        <Container fluid>
            {images}
        </Container>
    )
}

export default Gallery