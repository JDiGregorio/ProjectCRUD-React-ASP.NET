import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap'

import ContactTable from "./components/ContactTable"
import ModalContact from './components/ModalContact'

const App = () => {
    const [contacts, setContacts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await fetch("api/contact/GetContacts")

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setContacts(data)
        } else {
            console.log("Error: " + response.status)
        }
    }

    const saveContact = async (contact) => { 
        const response = await fetch("api/contact/StoreContact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contact)
        })

        if (response.ok) {
            setShowModal(!showModal)
            getData()
        } else {
            console.log("Error: " + response.status)
        }
    }

    const editContact = async (contact) => {
        const response = await fetch("api/contact/EditContact", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contact)
        })

        if (response.ok) {
            setShowModal(!showModal)
            getData()
        } else {
            console.log("Error: " + response.status)
        }
    }

    const deleteContact = async (id) => {

        var respuesta = window.confirm("¿Desea eliminar el contacto?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contact/DeleteContact/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            getData()
        } else {
            console.log("Error: " + response.status)
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>
                                Lista de contactos
                            </h5>
                        </CardHeader>

                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setShowModal(!showModal)}>
                                Nuevo contacto
                            </Button>

                            <hr />

                            <ContactTable data={contacts} setEdit={setEdit} showModal={showModal} setShowModal={setShowModal} deleteContact={deleteContact} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalContact showModal={showModal} setShowModal={setShowModal} saveContact={saveContact} edit={edit} setEdit={setEdit} editContact={editContact} />
        </Container>    
    )
}

export default App