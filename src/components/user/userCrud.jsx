import React,{Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
  icon:'users',
  title:'Usuários',
  subtitle:'Cadastro de usuário: Incluir, Listar, Alterar e Excluir'
}

const baseUrl='http://localhost:3001/users'
const initialState={
  user:{name:'',email:''},
  list:[{name:'3'}]
}
export default class userCrud extends Component{
  
  state={...initialState}

  componentWillMount(){
    axios['get'](baseUrl).then(
      resp => {
         this.setState({list:resp.data})   
      }
    )
  }

  load(user){
    this.setState({user})
  }
  remove(user){
    axios.delete(`${baseUrl}/${user.id}`)
      .then(resp =>{
        const list = this.state.list.filter(resp=> resp.id!== user.id)
        this.setState({list})
      })
  }
  clear(){
    this.setState({user:initialState.user})
  }

  save(){
    const user = this.state.user
    const method = user.id? 'put':'post'
    const url = user.id? `${baseUrl}/${user.id}`: baseUrl
    axios[method](url,user)
      .then(resp=>{
        const list = this.getUpdatedList(resp.data)
        this.setState({user:initialState.user,list})
      })  
  }

  getUpdatedList(user){
    const list = this.state.list.filter(resp=> resp.id!== user.id)
    list.unshift(user)
    return list
  }

  updateField(event){
    const user = {...this.state.user}
    user[event.target.name] = event.target.value
    this.setState({user})
  }

  renderTable(){
    return(
    <table className="table mt-4">
      <thead>
         <tr>
           <th>ID</th>
           <th>Nome</th>
           <th>E-mail</th>
           <th>Ações</th>
         </tr>
      </thead>
      <tbody>
        {this.renderRows()}
      </tbody>
    </table>
    )
  }
  renderRows(){
    return(

      this.state.list.map(user=>{
        return(
          <tr key={user.id} >
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button 
                onClick={()=>this.load(user)}
                className="btn btn-warning">
                <i className="fa fa-pencil"></i>
              </button>
              <button 
                className="btn btn-danger ml-2"
                onClick={()=>this.remove(user)}>
                <i className="fa fa-trash"> </i>
              </button>
            </td>
          </tr>
        )
      })
    )
  }
  renderForm(){
    return(
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input 
                type="text" 
                name="name"
                value={this.state.user.name}
                onChange={e=>this.updateField(e)}
                placeholder="Digite o nome...."
                className="form-control"/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
             <label>E-mail</label>
             <input 
                type="text" 
                name="email"
                value={this.state.user.email}
                onChange={e=>this.updateField(e)}
                placeholder="Digite o E-mail...."
                className="form-control"/>
            </div>
          </div>
        </div>

        <hr></hr>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
             <button 
              onClick={e=>this.save(e)}
              className="btn btn-primary">
               Salvar
             </button>
             <button 
              onClick={e=>this.clear(e)}
              className="btn btn-secundary ml-2">
               Cancelar
             </button>
          </div>
        </div>
      </div>
    )
  }

  render(){

    return(
      <Main
        {...headerProps}
      >
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
} 