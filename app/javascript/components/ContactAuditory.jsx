import { Table, message, Popconfirm } from "antd";
import React from "react";

class ContactAuditory extends React.Component {
    columns = [
        {
            title: "Field name",
            dataIndex: "nombreCampo",
            key: "nombreCampo",
        },
        {
            title: "Old value",
            dataIndex: "valorAnterior",
            key: "valorAnterior",
        },
        {
            title: "New value",
            dataIndex: "valorActual",
            key: "valorActual",
        },
        {
            title: "Updated",
            dataIndex: "created_date",
            key: "created_date",
        }

    ];

    state = {
        auditories: [],
    };

    componentDidMount() {
        this.loadAuditories()
    }

    loadAuditories = () => {
        const url = `api/v1/contacts/${this.props.record.id}/auditory`;
        this.setState((prevState) => ({
            auditories: [],
        }));
        fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then((data) => {
                data.forEach((auditory) => {
                    const newEl = {
                        key: auditory.id,
                        id: auditory.id,
                        nombreCampo: auditory.nombreCampo,
                        valorAnterior: auditory.valorAnterior,
                        valorActual: auditory.valorActual,
                        created_date: auditory.created_date,
                    };

                    this.setState((prevState) => ({
                        auditories: [...prevState.auditories, newEl],
                    }));
                });
            })
            .catch((err) => message.error("Error: " + err));
    };


    render() {
        return (
            <>
                <h3>Contact auditory</h3>
                <Table className="table-striped-rows"
                       dataSource={this.state.auditories}
                       columns={this.columns}
                       pagination={{ pageSize: 5 }} />
            </>
        );
    }
}

export default ContactAuditory;

