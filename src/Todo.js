import React, { Component } from 'react';
import Lista from './Components/Lista'
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
  }

  componentDidMount() {
    const listaTarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (listaTarefas !== null) {
      this.setState({
        lista: listaTarefas
      })
    }
  }

  handleInput = e => {
    this.setState({
      tarefa: { id: 0, texto: e.target.value, completo: false }
    })
  }

  adicionaTarefa = e => {
    e.preventDefault();

    const lista = this.state.lista;

    if (this.state.tarefa.texto !== '') {
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

  deletaTarefa = texto => e => {
    e.preventDefault();

    const lista = [...this.state.lista];
    const listaAlterada = lista.filter(tarefa => tarefa.texto !== texto);

    this.setState({
      lista: listaAlterada
    })
  }

  atualizarLista = tarefa => {
    let lista = [...this.state.lista];
    lista.map((t, index) => {
      if (tarefa.texto === t.texto) {
        lista[index] = tarefa
      } return '';
    });

    localStorage.setItem('tarefas', JSON.stringify(lista));

    this.setState({
      lista: lista
    })
  }

  render() {

    return (
      <div className='app'>
        <h1 className='titulo'>Todo App</h1>
        <form onSubmit={this.adicionaTarefa} className='form'>
            <input className='tarefa-input' type='text' value={this.state.tarefa.texto} onChange={this.handleInput} placeholder='Nova Tarefa' required />
          <div className='add-tarefa'>
            <button className='add-tarefa-btn' type='submit' >Adicionar</button>
          </div>
        </form>
        <div>
          <Lista atualizarLista={this.atualizarLista} deletaTarefa={this.deletaTarefa} lista={this.state.lista} />
        </div>
      </div>
    )
  }
}

export default Todo;