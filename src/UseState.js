import React, { useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

const UseState = ({name}) => {

  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false, 
  })

  // const [value, setValue] = useState('');
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const onConfirm = () => {
    setState({
      // en los estados compuestos, tengo que traer el estado anterior con 
      // spread operator, y sobre ese actualizar
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  }

  const onWrite = (val) => {
    setState({
      ...state,
      value: val,
    })
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    }) 
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    }) 
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
          onChange={(event) => {
            onWrite(event.target.value);
          }} 
        />
        <button 
          onClick={() => {
            onCheck(); 
          }}
        >
          Comprobar
        </button>
        </div>
    )
  }else if(!!state.confirmed && !state.deleted){
    return (
      <>
        <p>Estás seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >Si, eliminar</button>
        <button
          onClick={() => {
            onReset();
          }}
        >No, me arrepentí</button>
      </>
    )
  }else{
    return (
      <>
        <p>Eliminado con éxito</p>

        <button
          onClick={() => {
            onReset();
          }}
        >Resetear, volver atrás</button>
      </>
    )
  }
}

export { UseState }