import React, { Component, Fragment } from 'react'
import Tarefa from './Tarefa'

class Lista extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: 'all',
            filtroTexto: '',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidUpdate() {
        localStorage.setItem('tarefas', JSON.stringify(this.props.lista));
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    render() {

        const { atualizarLista, deletaTarefa, lista } = this.props;

        return (
            <Fragment>
                <div className='radio-lista'>
                    <input className='radio' name='options' value='all' type='radio' checked={this.state.options === 'all'} onChange={this.handleChange} /> All
                    <input className='radio' name='options' value='todo' type='radio' checked={this.state.options === 'todo'} onChange={this.handleChange} /> Todo
                    <input className='radio' name='options' value='done' type='radio' checked={this.state.options === 'done'} onChange={this.handleChange} /> Done
                </div>
                <div>
                    <input className='input-filtro' type='text' name='filtroTexto' onChange={this.handleChange} placeholder='Buscar por nome' ></input>
                </div>
                <hr></hr>
                <div className='lista-div'>
                    <ul className='lista-tarefas'>
                        {lista.map((tarefa, index) => {
                            const filtro = tarefa.texto.toLowerCase().includes(this.state.filtroTexto.toLowerCase());
                            if (this.state.options === 'all' && filtro) {
                                return <Tarefa key={index} atualizarLista={atualizarLista} deletaTarefa={deletaTarefa} tarefa={tarefa} />
                            } else if (this.state.options === 'todo' && tarefa.completo === false && filtro) {
                                return <Tarefa key={index} atualizarLista={atualizarLista} deletaTarefa={deletaTarefa} tarefa={tarefa} />
                            } else if (this.state.options === 'done' && tarefa.completo === true && filtro) {
                                return <Tarefa key={index} atualizarLista={atualizarLista} deletaTarefa={deletaTarefa} tarefa={tarefa} />
                            } return '';
                        })}
                    </ul>
                </div>
            </Fragment>
        )
    }

}

export default Lista;


