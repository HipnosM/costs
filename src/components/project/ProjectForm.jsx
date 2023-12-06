import { useState, useEffect } from 'react';

import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import Input from '../form/Input';
import styles from './ProjectForm.module.css';

export default function ProjectForm({ handleSubmit, projectData, btnText }) {

  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState(projectData || {});

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
  }, [])

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(projects);
  };

  function handleChange(e) {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };

  function handleCategory(e) {
    setProjects({
      ...projects,
      categories: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        name="name"
        text="Nome do projeto"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={projects.name ? projects.name : ""}
        />
      <Input
        type="number"
        name="total"
        text="Orçamento do projeto"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={projects.total ? projects.total : ""}
        />
      <Select
        name="category_id"
        text="Selecione a categoria"
        categories={categories}
        handleOnChange={handleCategory}
        value={projects.categories ? projects.categories.id : ""}
      />
      <SubmitButton
        text={btnText}
      />
    </form>
  );
};