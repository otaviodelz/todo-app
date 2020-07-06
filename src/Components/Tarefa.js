import React, { Component } from 'react';
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Tarefa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stateOne: {
                display: 'none'
            },
            stateTwo: {
                display: 'inline'
            },
            tarefa: {
                texto: this.props.tarefa.texto,
                id: this.props.tarefa.id,
                completo: this.props.tarefa.completo
            }
        }
    }

    componentDidUpdate() {
        localStorage.setItem('tarefas', JSON.stringify(this.props.lista));
    }

    handleChange = e => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        let tarefa = this.state.tarefa;
        tarefa[name] = value

        this.setState({
            tarefa: tarefa
        })

        this.props.atualizarLista(this.state.tarefa)
    }

    toggleEdit = e => {
        e.preventDefault();

        this.setState({
            stateOne: { display: (this.state.stateOne.display === 'none') ? 'inline' : 'none' },
            stateTwo: { display: (this.state.stateTwo.display === 'none') ? 'inline' : 'none' }
        })
    }

    saveEdit = e => {
        e.preventDefault();
        this.toggleEdit(e);

        this.props.atualizarLista(this.state.tarefa)
    }

    render() {

        const { deletaTarefa, tarefa } = this.props;

        return (
            <li className='item-lista'>
                <input
                    className='task-input-value'
                    type='text'
                    name='texto'
                    value={this.state.tarefa.texto}
                    style={this.state.stateOne}
                    onChange={this.handleChange}
                />
                <input
                    className='checkbox'
                    style={this.state.stateTwo}
                    type='checkbox' name='completo'
                    checked={this.state.tarefa.completo}
                    value={this.state.tarefa.completo}
                    onChange={this.handleChange}
                />
                <div className='tarefa-span'>
                    <span className='tarefa-texto' style={this.state.stateTwo}>{this.state.tarefa.texto}  </span>
                </div>
                <div className='buttons'>
                    <button
                        className='btn-icon'
                        variant="contained"
                        color="secondary"
                        style={this.state.stateTwo}
                        onClick={deletaTarefa(tarefa.id)}
                    > <FontAwesomeIcon icon={faTrash} /> </button>
                    <button
                        className='btn-icon'
                        style={this.state.stateTwo}
                        onClick={this.toggleEdit}
                    > <FontAwesomeIcon icon={faEdit} /> </button>
                    <button
                        style={this.state.stateOne}
                        onClick={this.saveEdit}
                        className='btn-icon'
                    > <FontAwesomeIcon icon={faSave} /> </button>
                </div>
            </li>
        )
    }

}

export default Tarefa



