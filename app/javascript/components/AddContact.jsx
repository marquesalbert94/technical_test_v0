import {Button, Form, Input, message, Modal, Select, Table} from "antd";
import React from "react";

const { Option } = Select;

class AddContact extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        contacts: [],
        emails: [],
    };

    onFinish = (values) => {
        const url = "api/v1/contacts/create";

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((data) => {
                if (data.ok) {
                    this.handleCancel();

                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then(() => {
                this.props.reloadContacts();
            })
            .catch((err) => console.error("Error: " + err));
    };




    emailValidation = (_, value) => {
        var emailExists = false;
        const contacts = this.props.contacts
        contacts.forEach(contact => {
            console.log(contact.email)
            if(contact.email.toUpperCase() == value.toUpperCase()){
                console.log("email ya existe")
                emailExists = true
            }
        })

        if(emailExists){
            return Promise.reject()
        }else {
            return Promise.resolve()
        }
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
        this.formRef.current.resetFields()
    };


    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>

                <Button type="primary" style={{ background: "#7c73e6"}} onClick={this.showModal}>
                    New contact
                </Button>

                <Modal title="Add new contact"
                       visible={this.state.visible}
                       onCancel={this.handleCancel}
                       footer={null}>

                    <Form ref={this.formRef}
                          layout="vertical"
                          onFinish={this.onFinish} >
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                { required: true, message: "This field is mandatory" },
                                {pattern: /^[A-zÀ-ú\s]*$/, message: "invalid format"}

                            ]}>
                            <Input type="string" />

                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                { required: true, message: "This field is mandatory" },
                                {pattern: /^[A-zÀ-ú\s]*$/, message: "invalid format"}

                            ]}>
                            <Input type="string" />

                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "This field is mandatory" },
                                {validator: this.emailValidation, message: "email must be unique"},
                                {pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "invalid format"},
                            ]}
                        >
                            <Input type="string" />

                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="Phone number"
                            rules={[
                                { required: true, message: "This field is mandatory" },
                                { min: 9, message: "This field length must be between 9 and 12"},
                                { max: 12, message: "This field length must be between 9 and 12"}
                            ]}>
                            <Input type="number" />

                        </Form.Item>

                        <Form.Item>
                            <Button type="primary"  style={{ background: "#7c73e6"}} htmlType="submit">
                                Create contact
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </>
        );
    }
}

export default AddContact;