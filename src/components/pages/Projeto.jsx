import styles from "./Projeto.module.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { parse, v4 as uuidv4 } from "uuid";

import Loader from "../layout/Loader";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

import { FaArrowLeft } from "react-icons/fa";

export default function Project() {

    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [services, setServices] = useState([]);

    const [showServiceForm, setShowServiceForm] = useState(false);

    const [message, setMessage] = useState("");
    const [typeMessage, setTypeMessage] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services);
                })
                .catch((err) => console.log(err))
        }, 500)
    }, [id]);

    function editPost(project) {
        setMessage("");

        if (project.total < project.cost) {
            setMessage("O orçamento é menor que o custo do projeto!");
            setTypeMessage("error");
            return false;
        };

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(!showProjectForm);

                setMessage("Projeto atualizado com sucesso!");
                setTypeMessage("success");
            })
            .catch((err) => console.log(err))
    }

    function createService(project) {
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        setMessage("");
        if (newCost > parseFloat(project.total)) {
            setMessage("O valor do serviço ultrapassa o orçamento!");
            setTypeMessage("error");
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setShowServiceForm(!showServiceForm);
                
                setMessage("Serviço adicionado com sucesso!");
                setTypeMessage("success");
            })
            .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        );

        const projectUpdated = project;
        projectUpdated.services = servicesUpdate;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated),
        })
        .then((resp) => resp.json)
        .then((data) => {
            setProject(projectUpdated);
            setServices(servicesUpdate);

            setMessage("Serviço removido com sucesso!");
            setTypeMessage("success");
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    };

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    };

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={typeMessage} text={message} />}
                        <div className={styles.details_container}>
                            <div className={styles.details_header}>
                                <Link to="/projetos"><FaArrowLeft /></Link>
                                <h1>Projeto: {project.name}</h1>
                            </div>
                            <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? "Editar projeto" : "Fechar"}</button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.categories.name}
                                    </p>
                                    <p>
                                        <span>Orçamento total:</span> R$ {project.total}
                                    </p>
                                    <p>
                                        <span>Orçamento utilizado:</span> R$ {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Salvar"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))}
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (<Loader />)}
        </>
    );
};