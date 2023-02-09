import React from 'react'
import { Table, Button } from 'reactstrap'

const ContactTable = ({ data, setEdit, showModal, setShowModal, deleteContact }) => {

    const sendData = (contact) => {
        setEdit(contact)
        setShowModal(!showModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {(data.length < 1) ? (
                    <tr>
                        <td colSpan="4">
                            Sin registros
                        </td>
                    </tr>
                ) : (
                    data.map(item => (
                        <tr key={item.idContact}>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.phoneNumber}
                            </td>
                            <td>
                                <Button color="primary" size="sm" className="me-2" onClick={() => sendData(item)}>
                                    Editar
                                </Button>

                                <Button color="danger" size="sm" onClick={() => deleteContact(item.idContact)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    )
}

export default ContactTable