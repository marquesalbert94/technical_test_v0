import React from "react";
import {Popconfirm, Table, Button, Space} from "antd";
import UpdateContact from "./UpdateContact";

class ContactData extends React.Component {
    dataSource = [
        {
            key:`${this.props.record.id}`,
            firstName: `${this.props.record.firstName}`,
            lastName: `${this.props.record.lastName}`,
            email: `${this.props.record.email}`,
            phoneNumber: `${this.props.record.phoneNumber}`
        }
    ];
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
            render: (_text) => (
                    <Popconfirm title="Are you sure you want to delete this contact?"
                                onConfirm={() => {
                                    this.props.deleteContact(this.props.record.id)
                                }}
                                okText="Yes"
                                cancelText="No"
                                okButtonProps={{style:{background:"#7c73e6"}}}>
                        <Button type="primary"  style={{ background: "#7c73e6"}}>
                            Delete
                        </Button>
                    </Popconfirm>
),
        },
        {
            title: "",
            key: "editAction",
            render: (_text) => (
                <UpdateContact reloadContacts={this.props.reloadContacts}
                               record={this.props.record}
                               contacts={this.props.contacts}
                />
            ),
        }
        ];

    render() {
        return (
            <>
                <Table className="table-striped-rows"
                       dataSource={this.dataSource}
                       columns={this.columns}
                       pagination={false}
                />
            </>
        )
    }
}

export default ContactData;



