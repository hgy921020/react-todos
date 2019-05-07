import React,{Component} from 'react'

export default class Todo extends Component{
    constructor(){
        super()
        this.myInput = React.createRef();
    }

    showEditInput=()=>{  //双击label，显示input编辑框，并让其获取焦点
        let {id,handleEdit} = this.props;
        handleEdit(id)
        let timeout = setTimeout(()=>{ //等待input框完全显示后，再获取焦点
            this.myInput.current.focus();
            clearTimeout(timeout);
        },100)
    }

    handleSave=(ev)=>{  //编辑框回车保存的执行函数
        if(ev.which===13){
            let v = this.myInput.current.value;
            let id = this.props.id;
            this.props.handleRealSave(id,v)
        }
        // console.log();
    }

    render(){
        let {content,isCheck,id,isEdit,handleDel,handleCheck} = this.props;
        let ischeck = isCheck?'completed':'';
        let isedit = isEdit?'editing':'';
        let listate = ischeck+' '+isedit;
        return (
            <li className={listate}>
                <div className="view">
                    <input 
                    type="checkbox" 
                    className="toggle" 
                    defaultChecked={isCheck} onChange={()=>{handleCheck(id)}}/>
                    <label onDoubleClick={this.showEditInput}>{content}</label>
                    <button className="destroy" onClick={()=>{handleDel(id)}}></button>
                </div>
                <input 
                type="text" 
                className="edit" 
                defaultValue={content} 
                ref={this.myInput} 
                onKeyUp={this.handleSave}/>
            </li>
        )
    }
}