import styles from './Select.module.css';

export default function Select({ text, name, categories, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || "DEFAULT"}>
                <option disabled value="DEFAULT">Selecione uma opção</option>
                {categories.map((categories) => (
                    <option value={categories.id} key={categories.id}>{categories.name}</option>
                ))}
            </select>
        </div>
    );
};