import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loader from "../layout/Loader";

import styles from "./Projetos.module.css";

export default function Projetos() {

    const [projetos, setProjetos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("");

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjetos(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err))
        }, 500);
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjetos(projetos.filter((project) => project.id !== id));
            setProjectMessage("Projeto removido com sucesso!");
        })
        .catch((err) => console.log(err))
    };

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos</h1>
                <LinkButton to="/novo-projeto" text="Novo projeto" />
            </div>
            {message && <Message type="success" text={message} />}
            {projectMessage && <Message type="success" text={projectMessage} />}
            <Container customClass="start">
                {projetos.length > 0 &&
                    projetos.map((project) => 
                    <ProjectCard
                        name={project.name}
                        id={project.id}
                        total={project.total}
                        category={project.categories.name}
                        key={project.id}
                        handleRemove={removeProject}
                    />)}
                {!removeLoading && <Loader />}
                {removeLoading && projetos.length === 0 && (
                    <p>Não há nenhum projeto criado!</p>
                )}
            </Container>
        </div>
    );
};