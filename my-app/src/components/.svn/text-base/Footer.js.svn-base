import React,{Component} from 'react'

export default class Footer extends Component{
    render(){
        let {leftnum,fstate,handleTab} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong> {leftnum} </strong>
                    <span>item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <span className={fstate==='all'?'selected':''} onClick={()=>{handleTab('all')}}>All</span>
                    </li>
                    <li>
                        <span className={fstate==='active'?'selected':''} onClick={()=>{handleTab('active')}}>Active</span>
                    </li>
                    <li>
                        <span className={fstate==='complete'?'selected':''} onClick={()=>{handleTab('complete')}}>Completed</span>
                    </li>
                </ul>
                <button className="clear-completed">
                    clear all completed
                </button>
            </footer>
        )
    }
}