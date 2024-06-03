import React, {Component} from 'react';
import Header from '../header/Header';
import './Task.css';

const data = {
    id: 1,
    title: 'Create theme',
    description: 'Create theme with bootstrap',
    date: '2021-01-01',
}

const ToDo = ({props})=>{
    const modalId = `modal-update-${props.id}`;
    return (
        <div className="todo-item row">
            <div className="checker me-4 col-1"><span className=""><input type="checkbox" /></span></div>
            <div className='row col'>
                <div className='col'>
                    <span>{props.title}</span>
                </div>
                <div className='col-5 row'>
                    <div className='col d-flex justify-content-evenly'>
                        <a href='#' className='inline-block text-success' type='button' data-bs-toggle="modal" data-bs-target={`#${modalId}`}><i className="bi bi-pencil"></i>&nbsp;edit</a>
                        <UpdateModal id={props.id} />
                        <a href='#' className='inline-block text-danger'><i className="bi bi-trash3"></i>&nbsp;delete</a>
                    </div>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                        <span className='d-inline-block fs-date text-secondary'>{props.date}</span>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

const InsertModal = () => {
    return (
            <div className="modal modal-lg fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Your Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="mb-3">
                                <label for="task">Task</label>
                                <input type="text" className="form-control" id="task" required name='task' />
                            </div>
                            <div className="mb-3">
                                <label for="description">Description</label>
                                <textarea className="form-control" placeholder="Leave your description here" id="description" rows={8} required={true} name='description' />
                            </div>
                            <div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    );
}

const UpdateModal = ({id}) => {
    return (
            <div className="modal modal-lg fade" id={`modal-update-${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`label-modal-update-${id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Your Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="mb-3">
                                <label for={`modal-update-task-${id}`} >Task</label>
                                <input type="text" className="form-control" id={`modal-update-task-${id}`} required name='task' />
                            </div>
                            <div className="mb-3">
                                <label for={`modal-update-description-${id}`} >Description</label>
                                <textarea className="form-control" placeholder="Leave your description here" id={`modal-update-description-${id}`} name='description' rows={8} required={true} />
                            </div>
                            <div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    );
}

class Task extends Component{
    render(){
       return  (
            <div>
                <Header />
                <div className="container" >
                        <div className="row" >
                            <div className="col-md-12">
                                <div className="card card-white">
                                    <div className="card-body">
                                        <form action="" className='row'>
                                            <input type="text" className="form-control add-task col" placeholder="New Task..." />
                                            <button className='btn col-1 border border-0 text-primary' type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
                                                    <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                                </svg>
                                            </button>
                                            <InsertModal />
                                        </form>
                                        <ul className="nav nav-pills todo-nav">
                                            <li role="presentation" className="nav-item all-task active"><a href="#" className="nav-link">All</a></li>
                                            <li role="presentation" className="nav-item active-task"><a href="#" className="nav-link">Active</a></li>
                                            <li role="presentation" className="nav-item completed-task"><a href="#" className="nav-link">Completed</a></li>
                                        </ul>
                                        <div className="todo-list">
                                            <div className="todo-item row">
                                                <div className="checker me-4 col-1"><span className=""><input type="checkbox" /></span></div>
                                                <div className='row col'>
                                                    <div className='col'>
                                                        <span>Create theme</span>
                                                    </div>
                                                    <div className='col-5 row'>
                                                        <div className='col d-flex justify-content-evenly'>
                                                            <a href='#' className='inline-block text-success'><i class="bi bi-pencil"></i>&nbsp;edit</a>
                                                            <a href='#' className='inline-block text-danger'><i class="bi bi-trash3"></i>&nbsp;delete</a>
                                                        </div>
                                                        <div className='col-2 d-flex justify-content-end align-items-center'>
                                                            <span className='d-inline-block fs-date text-secondary'>yesterday</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ToDo props={data}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Task;