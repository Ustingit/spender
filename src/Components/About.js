import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class About extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col>Spender app. by <a href="https://www.linkedin.com/in/yustinovich/" target="_blank" >Yuryi Ustsinovich</a></Col>
                    <Col>Created for training some skills related to React library. I' trying to use it for controlling of the my spends. You can try as well!</Col>
                    <Col>All questions - <a href="mailto:ustinhtc@gmail.com?subject=spender's ABOUT link.">ustinhtc@gmail.com</a></Col>
                </Row>
            </Container>
        );
    }
}

export default About;