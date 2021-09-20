import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import ContactAuditory from "./ContactAuditory";

const { Option } = Select;

class UpdateContact extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
    };

    onFinish = (values) => {
        const url = `api/v1/contacts/${this.props.record.id}`;
        fetch(url, {
            method: "put",
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
            .catch((err) => console.error("Error: " + err))
    };

    emailValidation = (_, value) => {
        var emailExists = false;
        const contacts = this.props.contacts
        contacts.forEach(contact => {
            console.log(contact.email)
            if(contact.email.toUpperCase() == value.toUpperCase()
                &&
                contact.id != this.props.record.id ){
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


    render(record) {
        return (
            <>
                <Button type="primary"
                        style={{ background: "#7c73e6"}}
                        onClick={this.showModal}>
                    Edit
                </Button>

                <Modal title="Edit contact"
                       visible={this.state.visible}
                       onCancel={this.handleCancel}
                       footer={null}>
                    <Form
                            ref={this.formRef}
                            layout="vertical"
                            onFinish={this.onFinish}
                            initialValues={
                                {
                                    remember:true,
                                    firstName:this.props.record.firstName,
                                    lastName:this.props.record.lastName,
                                    email:this.props.record.email,
                                    phoneNumber:this.props.record.phoneNumber,
                                }
                            }>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                { required: true, message: "This field is mandatory" },
                                {pattern: /^[A-zÀ-ú\s]*$/, message: "invalid format"}

                            ]}>
                            <Input type="string"/>

                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                { required: true, message: "This field is mandatory" },
                                {pattern: /^[A-zÀ-ú\s]*$/, message: "invalid format"}

                            ]}>
                            <Input type="string"  />

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
                            <Button type="primary" style={{ background: "#7c73e6"}} htmlType="submit">
                                Update contact
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default UpdateContact;