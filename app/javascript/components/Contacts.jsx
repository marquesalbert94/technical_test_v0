import {Table, message, Popconfirm, Button} from "antd";
import React from "react";
import AddContact from "./AddContact";
import UpdateContact from "./UpdateContact";
import ShowContact from "./ShowContact";

class Contacts extends React.Component {
    columns = [
        {
            title: "First name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Phone number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },

        {
            title: "",
            key: "deleteAction",
            render: (_text, record) => (
                <Popconfirm title="Are you sure you want to delete this contact?" onConfirm={() => this.deleteContact(record.id)} okText="Yes" cancelText="No" okButtonProps={{style:{background:"#7c73e6"}}}>
                    <Button type="primary" style={{ background: "#7c73e6"}}>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
        {
            title: "",
            key: "editAction",
            render: (_text, record) => (
                <UpdateContact reloadContacts={this.reloadContacts}
                               record={record} contacts={this.state.contacts}
                />
            ),
        },
        {
            title: "",
            key: "showAction",
            render: (_text, record) => (
                <ShowContact reloadContacts={this.reloadContacts}
                             record={record}
                             deleteContact={this.deleteContact}
                             contacts={this.state.contacts}/>
            ),
        }

    ];

    state = {
        contacts: [],
    };

    componentDidMount() {
        this.loadContacts()
    }

    loadContacts = () => {
        const url = "api/v1/contacts/index";
        this.setState((prevState) => ({
            contacts: [],
        }));
        fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then((data) => {
                data.forEach((contact) => {
                    const newEl = {
                        key: contact.id,
                        id: contact.id,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        email: contact.email,
                        phoneNumber: contact.phoneNumber,
                    };

                    this.setState((prevState) => ({
                        contacts: [...prevState.contacts, newEl],
                    }));
                });
            })
            .catch((err) => message.error("Error: " + err));
    };

    reloadContacts = () => {
        this.loadContacts();
    };

    deleteContact = (id) => {
        const url = `api/v1/contacts/${id}`;

        fetch(url, {
            method: "delete",
        })
            .then((data) => {
                if (data.ok) {
                    this.reloadContacts();
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .catch((err) => message.error("Error: " + err));
    };




    render() {
        return (
            <>
                <Table className="table-striped-rows" dataSource={this.state.contacts} columns={this.columns} pagination={{ pageSize: 5 }} />

                <AddContact reloadContacts={this.reloadContacts} columns={this.columns} contacts={this.state.contacts} />

            </>
        );
    }
}

export default Contacts;

