import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };
  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 1000);
    }
    console.log("terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>
          Por favor, escribe el código de seguridad para comprobar que quieres
          eliminar.
        </p>

        {state.error && !state.loading && <p>Error: el código es incorrecto</p>}

        {state.loading && <p>cargando</p>}

        <input
          placeholder="Código de Seguridad"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Estas seguro que quieres eliminar UseState</p>
        <button onClick={() => onDelete()}>Si, eliminar</button>

        <button onClick={() => onReset()}>No, volver</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminado con exito</h2>
        <button onClick={() => onReset()}>Recuperar UseState</button>
      </React.Fragment>
    );
  }
}

export { UseState };
