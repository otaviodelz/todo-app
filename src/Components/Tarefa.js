import React, { Component } from 'react';
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Tarefa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invisivel: {
                display: 'none'
            },
            visivel: {
                display: 'inline'
            },
            tarefa: this.props.tarefa
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


    //Toggle para tornar o input e botao de salvar visiveis, e também desaparecer os outros botões.
    toggleEdit = e => {
        e.preventDefault();

        this.setState({
            invisivel: { display: (this.state.invisivel.display === 'none') ? 'inline' : 'none' },
            visivel: { display: (this.state.visivel.display === 'none') ? 'inline' : 'none' }
        })
    }

    //Ativa o toggle e atualiza a lista com o novo valor
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
                    className='tarefa-input-value'
                    type='text'
                    name='texto'
                    value={this.state.tarefa.texto}
                    style={this.state.invisivel}
                    onChange={this.handleChange}
                />
                <input
                    className='checkbox'
                    style={this.state.visivel}
                    type='checkbox' name='completo'
                    checked={this.state.tarefa.completo}
                    value={this.state.tarefa.completo}
                    onChange={this.handleChange}
                />
                <div className='tarefa-span'>
                    <span className='tarefa-texto' style={this.state.visivel}>{this.state.tarefa.texto}</span>
                </div>
                <div className='buttons'>
                    <button
                        className='btn-icon'
                        style={this.state.visivel}
                        onClick={deletaTarefa(tarefa.texto)}
                    > <FontAwesomeIcon icon={faTrash} /> </button>
                    <button
                        className='btn-icon'
                        style={this.state.visivel}
                        onClick={this.toggleEdit}
                    > <FontAwesomeIcon icon={faEdit} /> </button>
                    <button
                        style={this.state.invisivel}
                        onClick={this.saveEdit}
                        className='btn-icon'
                    > <FontAwesomeIcon icon={faSave} /> </button>
                </div>
            </li>
        )
    }

}

export default Tarefa



