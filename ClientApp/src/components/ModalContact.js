import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from 'reactstrap'

const modelContact = {
    idContact: 0,
    name: "",
    email: "",
    phoneNumber: ""
}

const ModalContact = ({ showModal, setShowModal, saveContact, edit, setEdit, editContact }) => {
    const [contact, setContact] = useState(modelContact)

    useEffect(() => {
        if (edit != null) {
            setContact(edit)
        } else {
            setContact(modelContact)
        }
    }, [edit])

    const handleChange = (event) => {
        const { name, value } = event.target

        setContact(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSave = () => {
        if (contact.idContact == 0) {
            let newContact = contact
            delete newContact.idContact
            saveContact(newContact)
        } else { 
            editContact(contact)
        }

        setContact(modelContact)
    }

    const closeModal = () => {
        setShowModal(!showModal)
        setEdit(null)
    }

    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {contact.idContact == 0 ? "Nuevo contacto" : "Editar contacto"}
            </ModalHeader>

            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>
                            Nombre
                        </Label>

                        <Input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Nombre" />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Correo
                        </Label>

                        <Input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Correo" />
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Numero de telefono
                        </Label>

                        <Input type="text" name="phoneNumber" value={contact.phoneNumber} onChange={handleChange} placeholder="Numero de telefono" />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={() => handleSave()}>
                    Guardar
                </Button>
                <Button color="danger" size="sm" onClick={closeModal}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalContact