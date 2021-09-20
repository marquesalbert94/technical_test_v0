import {Button, Form, Input, message, Modal, Select} from "antd";
import React from "react";
import ContactData from "./ContactData";
import ContactAuditory from "./ContactAuditory";

const { Option } = Select;

class ShowContact extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };


    render(record) {
        return (
            <>
                <Button type="primary" style={{ background: "#7c73e6"}}
                        onClick={this.showModal}>
                    Show
                </Button>
                <Modal
                    width="800px"
                    title="Contact info"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}>

                    <ContactData record={this.props.record}
                                 deleteContact={this.props.deleteContact}
                                 contacts={this.props.contacts}
                                 reloadContacts={this.props.reloadContacts}
                    />
                    <br/>
                    <br/>
                    <ContactAuditory record={this.props.record}/>
                </Modal>
            </>
        );
    }
}

export default ShowContact;