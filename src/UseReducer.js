import React, { useEffect, useReducer } from 'react'

const SECURITY_CODE = 'paradigma';

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false, 
}

// nos va a permitir definir en variables los objetos y darnos cuenta si tenemos 
// mal escrito algun nombre
const actionTypes = {
  confirm: 'CONFIRM',
  check: 'CHECK',
  error: 'ERROR',
  delete: 'DELETE',
  write: 'WRITE',
  reset: 'RESET',

}

const reducerOBJECT = (state, payload) => ({
  [actionTypes.confirm]: {
          // en los estados compuestos, tengo que traer el estado anterior con 
    // spread operator, y sobre ese actualizar
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload
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
      confirmed: false,
      deleted: false,
      value: '',
  },
})

const reducer = (state, action) => {
  if (reducerOBJECT(state)[action.type]) {
    return reducerOBJECT(state, action.payload)[action.type];
  } else {
    return {
      ...state,
    }
  }
}

const UseReducer = ({name}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  const onWrite = (event) => {
    dispatch({ type: actionTypes.write, payload: event.target.value });
  }

  useEffect(() => {
    console.log('Empezando el efecto');

    if(!!state.loading){
      setTimeout(() => {
        console.log('Validando...');

        if(state.value === SECURITY_CODE){
          onConfirm();
        }else{
          onError();
        }
        console.log('Terminando la validación');
      }, 3000);
    }
    console.log('Terminando el efecto');
  }, [state.loading])

  if(!state.deleted && !state.confirmed){
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>Por favor escribe el código de seguridad.</p>

        {(state.error && !state.loading) && (
          <p>Error. Código incorrecto.</p>  
        )}

        {state.loading && (
          <p>Cargando...</p>  
        )}

        <input 
          placeholder='Código de seguridad' 
          value={state.value} 
          onChange={onWrite} 
        />
        <button onClick={onCheck}> Comprobar </button>
        </div>
    )
  }else if(!!state.confirmed && !state.deleted){
    return (
      <>
        <p>Estás seguro?</p>
        <button
          onClick={onDelete} > Si, eliminar </button>
        <button onClick={onReset} > No, me arrepentí </button>
      </>
    )
  }else{
    return (
      <>
        <p>Eliminado con éxito</p>

        <button onClick={onReset} >Resetear, volver atrás </button>
      </>
    )
  }
}

export { UseReducer }