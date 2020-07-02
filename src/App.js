import React, { Component } from 'react';
import './App.css'

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lista: [],
      tarefa: {
        texto: '',
        completo: false
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.adicionaTarefa = this.adicionaTarefa.bind(this);
    this.deletaTarefa = this.deletaTarefa.bind(this);
    this.alterarTarefa = this.alterarTarefa.bind(this)
  }

  componentDidUpdate() {
    localStorage.setItem('tarefas', JSON.stringify(this.state.lista));
  }

  componentDidMount() {
    const listaTarefas = JSON.parse(localStorage.getItem('tarefas'));
    if(listaTarefas !== null) {
      this.setState({
        lista: listaTarefas
      })
    }
  }

  handleInput = e => {
    this.setState({
      tarefa: {id: 0, texto: e.target.value, completo: false, editar: false }
    })
  }

  handleEditInput = e => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    })
  }

  adicionaTarefa = e => {
    e.preventDefault();

    const lista = this.state.lista;

    if(this.state.tarefa.texto !== '') {
      lista.push({
        id: lista.length,
        texto: this.state.tarefa.texto,
        completo: this.state.tarefa.completo,
        editar: this.state.tarefa.editar
      })

      this.setState({
        tarefa: {
          texto: ''
        },
      })
    }
  }

  deletaTarefa = id => e => {
    e.preventDefault();

    const lista = [...this.state.lista];
    const listaAlterada = lista.filter(tarefa => tarefa.id !== id);

    this.setState({
      lista: listaAlterada
    })
  }

  alterarTarefa = id => e => {
    e.preventDefault();

    this.state.lista.map(i => {
      return i === id ? this.setState({ tarefa: { editar: true }}) : this.setState({ tarefa: { editar: false }})
    })

    this.setState({
      tarefa: { editar: true }
    })
    
  }

  render() {

    return(
      <div className='App'>
        <h1>Todo App</h1>
        <br/>
        <input value={this.state.tarefa.texto} onChange={this.handleInput} placeholder='Nova Tarefa' />
        <button onClick={this.adicionaTarefa}>Adicionar</button>
        <div>
          {this.state.lista.map(tarefa => {
              return <input name='tarefa' value={tarefa.texto} onChange={this.handleInput} />
          })}
        </div>
      </div>
    )
  }
}

export default Todo