import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            className={css.searchBoxInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}
