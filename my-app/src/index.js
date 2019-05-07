import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import Todo from './components/Todo'
import Footer from './components/Footer'
import axios from 'axios'
class Cont extends Component{ 
    constructor(){
        super()
        this.myInput = React.createRef();
        this.state = {
            filterState:'all', //控制footer底部菜单切换的状态，all表示所有任务，active表示未完成，complete表示已完成
            todoList:[]
        }
    }
    handleAdd=(ev)=>{
        if(ev.which===13){
            let v = this.myInput.current.value.trim();
            if(v!==''){
                let url = `http://localhost:8000/add?content=${v}`
                axios.get(url).then((result)=>{
                    if(result.data.code===1){                       
                        this.setState({
                            todoList:[
                                ...this.state.todoList,
                                {
                                    'id':result.insertid,
                                    'content':v,
                                    'isCheck':false,
                                    'isEdit':false
                                }
                            ]
                        })
                        this.myInput.current.value = ''
                    }
                })
            }
        }
    }
    
    handleDel=(id)=>{   //删除任务
        // alert('点击了删除按钮')
        console.log(id)
        var todolist = this.state.todoList;
        todolist.forEach((obj,i)=>{
            if(obj.id===id){
                todolist.splice(i,1);
                this.setState({
                    todoList:todolist
                })
                return false;
            }
        })
    }

    handleCheck=(id)=>{ //单个任务的勾选状态控制
        // obj.num = 1
        var todolist = this.state.todoList;
        todolist.forEach((obj)=>{
            if(obj.id===id){
                obj.isCheck = !obj.isCheck
                axios.get(`http://localhost:8000/check?id=${id}&check=${obj.isCheck}`)
                    .then((result)=>{
                       if(result.data.code===1){
                             this.setState({
                                todoList:todolist
                            })
                       }
                    })
               
                return false;
            }
        })
    }

    handleEdit=(id)=>{ //操作编辑框的显示隐藏
        console.log(id)
        var todolist = this.state.todoList;
        todolist.forEach((obj)=>{  //关闭所有任务的编辑状态
                obj.isEdit = false
        })
        todolist.forEach((obj)=>{ //开启指定id所对应任务的编辑状态
            if(obj.id===id){
                obj.isEdit = true
                this.setState({
                    todoList:todolist
                })
                return false;
            }
        })
    }

    handleRealSave=(id,str)=>{  //保存编辑后的任务内容
        var todolist = this.state.todoList;

        todolist.forEach((obj)=>{ 
            if(obj.id===id){
                obj.isEdit = false
                obj.content = str
                this.setState({
                    todoList:todolist
                })
                return false;
            }
        })
    }

    handleTab=(str)=>{ //实现footer菜单切换
        console.log(str)
        this.setState({
            filterState:str
        })
    }
    componentWillMount(){
        axios.get('http://localhost:8000')
            .then((result)=>{
                // console.log(result)
                if(result.data.code===1){
                     this.setState({
                            todoList:result.data.data
                        })
                }
               
            })
    }
    render(){
        let TodoList = [];
        let fState = this.state.filterState;

        switch (fState) {
            case 'all':
                TodoList = this.state.todoList.map((obj)=>{
                    return (
                        <Todo 
                            content={obj.content} 
                            isCheck={obj.isCheck} 
                            isEdit={obj.isEdit} 
                            id={obj.id}
                            key={obj.id}
                            handleDel={this.handleDel}
                            handleCheck = {this.handleCheck}
                            handleEdit = {this.handleEdit}
                            handleRealSave = {this.handleRealSave}
                        />
                    )
                })
                break;
            case 'active':
                TodoList = this.state.todoList.map((obj)=>{
                    if(!obj.isCheck){
                        return (
                            <Todo 
                                content={obj.content} 
                                isCheck={obj.isCheck} 
                                isEdit={obj.isEdit} 
                                id={obj.id}
                                key={obj.id}
                                handleDel={this.handleDel}
                                handleCheck = {this.handleCheck}
                                handleEdit = {this.handleEdit}
                                handleRealSave = {this.handleRealSave}
                            />
                        )
                    }
                })
                break;
            case 'complete':
                TodoList = this.state.todoList.map((obj)=>{
                    if(obj.isCheck){
                        return (
                            <Todo 
                                content={obj.content} 
                                isCheck={obj.isCheck} 
                                isEdit={obj.isEdit} 
                                id={obj.id}
                                key={obj.id}
                                handleDel={this.handleDel}
                                handleCheck = {this.handleCheck}
                                handleEdit = {this.handleEdit}
                                handleRealSave = {this.handleRealSave}
                            />
                        )
                    }
                })
                break
            default:
                break;
        }

        let leftNum = 0; //剩余任务总数
        this.state.todoList.forEach((obj)=>{
            if(!obj.isCheck){
                leftNum++
            }
        })

        let footer = this.state.todoList.length>0 ? 
        <Footer leftnum={leftNum} 
        fstate={this.state.filterState} 
        handleTab = {this.handleTab}/> : ''; //控制底部footer区域的显示隐藏

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input 
                    type="text" 
                    className="new-todo" 
                    placeholder="type something here" 
                    ref={this.myInput} 
                    onKeyUp={this.handleAdd}/>
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all" />
                    <ul className="todo-list">
                        {TodoList}
                    </ul>
                </section>
                {footer}
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <Cont/>
    </div>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
