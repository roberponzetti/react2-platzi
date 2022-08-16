import React, { Component } from 'react'

const SECURITY_CODE = 'paradigma';

class ClassState extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      value: '',
      error: true,
      loading: false,
    }
  }

  componentDidUpdate(){
    console.log('actualizacion');

    if(!!this.state.loading){
      setTimeout(() => {
        console.log('Validando');

        if(SECURITY_CODE === this.state.value){
          this.setState({ error: false, loading: false});
        }else{
          this.setState({ error: true, loading: false });
        }

        console.log('Terminando la validación');
      }, 3000);
    }
  }
    
  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name }</h2>

        <p>Por favor escribe el código de seguridad.</p>

      {(this.state.error && !this.state.loading) && (
        <p>Error. Código incorrecto.</p>  
      )}

      {this.state.loading && (
        <p>Cargando...</p>  
      )}

      <input 
        placeholder='Código de seguridad' 
        value={this.state.value}
        onChange={(event) =>{
          this.setState({value: event.target.value});
        }}
      />
      <button 
        onClick={() => this.setState({loading: true})}
      >
        Comprobar
      </button>
      </div>
    )
  }
}

export { ClassState }