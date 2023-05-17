import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });
  
  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
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
          onChange={onWrite}
        ></input>
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Estas seguro que quieres eliminar UseState</p>
        <button onClick={onDelete}>Si, eliminar</button>

        <button onClick={onReset}>No, volver</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminado con exito</h2>
        <button onClick={onReset}>Recuperar UseState</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    confirmed: true,
    value: "",
  },

  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },

  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
    value: "",
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
