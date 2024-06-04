import React, {Component, useState} from 'react';
import Header from '../header/Header';
import $ from 'jquery';
import './Task.css';

const data = [
    {
        id: 1,
        task: 'Acheter des fleurs pour le jardin',
        description: 'Choisissez des fleurs colorées pour égayer votre espace extérieur.',
        date: '2024-06-04',
        status: true
    },
    {
        id: 2,
        task: 'Réviser pour l examen de mathématiques',
        description: 'Passez en revue les formules et les concepts clés.',
        date: '2024-06-05',
        status: false
    },
    {
        id: 3,
        task: 'Préparer un gâteau au chocolat',
        description: 'Trouvez une recette délicieuse et mettez-vous aux fourneaux !',
        date: '2024-06-06',
        status: true
    },
    {
        id: 4,
        task: 'Faire une promenade au parc',
        description: 'Profitez du beau temps et respirez l\'air frais.',
        date: '2024-06-07',
        status: false
    },
    {
        id: 5,
        task: 'Lire un livre',
        description: 'Choisissez un livre qui vous passionne et plongez-vous dedans.',
        date: '2024-06-08',
        status: false
    },
    {
        id: 6,
        task: 'Nettoyer le garage',
        description: 'Organisez vos affaires et jetez ce dont vous n\'avez plus besoin.',
        date: '2024-06-09',
        status: true
    },
    {
        id: 7,
        task: 'Apprendre une nouvelle chanson à la guitare',
        description: 'Trouvez une partition et pratiquez jusqu\'à ce que vous la maîtrisiez.',
        date: '2024-06-10',
        status: false
    }
];


const ToDo = ({props})=>{
    const [checked, setChecked] = useState(props.status)
    const [title, setTitle] = useState(props.task)
    const [description, setDescription] = useState(props.description)
    const handleChange = () => {
        if (setChecked) {
            $(`#task-title-${props.id}`).addClass('text-decoration-line-through')
            setChecked(!checked)
        } else {
            $(`#task-title-${props.id}`).removeClass('text-decoration-line-through')
            setChecked(!checked)
        }
        console.log('checked')
    }
    const deleteTask = () =>{
        console.log('remove')
        $(`#task-${props.id}`).remove();
    }

    const updateTask = () =>{
        $(`#modal-update-task-title-${props.id}`).val(title)
        $(`#modal-update-description-${props.id}`).text(description)
    }

    const updateModal = () => {
        const task = $(`#modal-update-task-title-${props.id}`).val()
        const description = $(`#modal-update-description-${props.id}`).text()
        setTitle(task)
        setDescription(description)
        $(`#modal-update-close-btn-${props.id}`).click()
     }
    const modalId = `modal-update-${props.id}`;
    const lineThrough = checked ? 'text-decoration-line-through' : '';
    return (
        <div className="todo-item row" id={`task-${props.id}`}>
            <div className="checker me-4 col-1"><span className=""><input type="checkbox" onChange={handleChange} checked={checked}/></span></div>
            <div className='row col'>
                <div className='col'>
                    <a className="text-decoration-none popover btn border border-0 w-100-i" tabindex="0"  role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title={props.task} data-bs-content={props.description}> <span className={`${lineThrough}`} id={`task-title-${props.id}`}> {props.task}</span> </a>
                </div>
                <div className='col-5 row'>
                    <div className='col d-flex justify-content-evenly'>
                        <a href='#' className='inline-block text-success' type='button' data-bs-toggle="modal" data-bs-target={`#${modalId}`} onClick={updateTask}><i className="bi bi-pencil"></i>&nbsp;edit</a>
                        <UpdateModal id={props.id} updatemodal={updateModal} />
                        <a href='#' className='inline-block text-danger' onClick={deleteTask}><i className="bi bi-trash3"></i>&nbsp;delete</a>
                    </div>
                    <div className='col-3 d-flex justify-content-end align-items-center'>
                        <span className='d-inline-block fs-date text-secondary'>{props.date}</span>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

const InsertModal = ({insert, handleTask, handleDescription}) => {
        const [formValues, setFormValues] = useState({
            task: '',
            description: ''
        })
        const handleInsertSubmit = (e)=>{
                e.preventDefault()
                insert()
                $('#insert-task-btn-close').click()
                setFormValues({
                    task: '',
                    description: ''
                })
        }
    return (
            <div className="modal modal-lg fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Your Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='insert-task-btn-close'></button>
                    </div>
                    <div className="modal-body">
                        <form action="" onSubmit={handleInsertSubmit}>
                            <div className="mb-3">
                                <label for="task">Task</label>
                                <input type="text" className="form-control" id="task" required name='task' onChange={handleTask} value={formValues.task} onInput={e => setFormValues({...formValues, task: e.target.value})}/>
                            </div>
                            <div className="mb-3">
                                <label for="description">Description</label>
                                <textarea className="form-control" placeholder="Leave your description here" id="description" rows={8} required={true} name='description' onChange={handleDescription} value={formValues.description} onInput={e => setFormValues({...formValues, description: e.target.value})}/>
                            </div>
                            <div>
                                <button className="btn btn-primary" type="submit" onClick={handleInsertSubmit}>Insert</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    );
}

const UpdateModal = ({id, updatemodal}) => {
    const handleSubmitUpdate = ()=>{
        $(`#modal-update-form-${id}`).on('submit' ,function(e){
            e.preventDefault()
            updatemodal()
        })
    }
    return (
            <div className="modal modal-lg fade" id={`modal-update-${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`label-modal-update-${id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Your Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id={`modal-update-close-btn-${id}`} ></button>
                    </div>
                    <div className="modal-body">
                        <form action={updatemodal} id={`modal-update-form-${id}`}>
                            <div className="mb-3">
                                <label for={`modal-update-task-${id}`} >Task</label>
                                <input type="text" className="form-control" id={`modal-update-task-title-${id}`} required name='task' />
                            </div>
                            <div className="mb-3">
                                <label for={`modal-update-description-${id}`} >Description</label>
                                <textarea className="form-control" placeholder="Leave your description here" id={`modal-update-description-${id}`} name='description' rows={8} required={true} />
                            </div>
                            <div>
                                <button className="btn btn-success" type="submit" onClick={handleSubmitUpdate}>Update</button>

                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    );
}

class Task extends Component{
    constructor(props){
        super(props)
        this.state = {
            tasks: data,
            searchTask: data,
            search: '',
            task: '',
            bar: '',
            description: '',
        }
        this.handleTask = this.handleTask.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleSearch= this.handleSearch.bind(this)
        this.handleActive= this.handleActive.bind(this)
        this.handleComplted= this.handleComplted.bind(this)
        this.handleAll= this.handleAll.bind(this)
    }

    handleComplted(){
        this.setState((prev_task) =>{
            return {
                tasks: [...prev_task.searchTask.filter((task) => task.status)]
            }
        })
    }

    handleActive(){
        this.setState((prev_task) =>{
            return {
                tasks: [...prev_task.searchTask.filter((task) => !task.status)]
            }
        })
    }

    handleAll(){
        this.setState((prev_task) =>{
            return {
                tasks: [...prev_task.searchTask]
            }
        })
    }
    handleSearch(e){
        const value = e.target.value
        const regex = new RegExp(`${value}`)
        this.setState((prev_task) =>{
            if (value !== '') {
                return {
                    tasks: [...prev_task.searchTask.filter((task) => regex.test(task.task) || regex.test(task.description) )]
                }
            } else {
                return {
                    tasks: prev_task.searchTask,
                }
            }
        })
    }
    handleTask(e){
        console.log(e.target.value)
        this.setState({task: e.target.value})
    }
    handleDescription(e){
        console.log(e.target.value)
        this.setState({description: e.target.value})
    }
    render(){
        const Insert = () => {
            const task = this.state.bar !== '' ? this.state.bar : this.state.task
            const description = this.state.description
            let date = new Date()
            const day = date.getDate() 
            const mm = date.getMonth() + 1
            const yy = date.getFullYear()
            const task_data = {
                id: Math.floor(Math.random() * 10000) + 1,
                task: task,
                description: description,
                date: `${yy}-${mm}-${day}`,
                status: false
            }
            console.log(task_data)
            return this.setState((prev_tasks)=>{
                console.log(prev_tasks.tasks)
                return {
                    tasks: [task_data, ...prev_tasks.tasks],
                    searchTask: [task_data, ...prev_tasks.tasks]
                }
            })            
    }
        const data = this.state.tasks
       return  (
            <div>
                <Header />
                <div className="container" >
                        <div className="row" >
                            <div className="col-md-12">
                                <div className="card card-white">
                                    <div className="card-body">
                                        <form action="" className='row'>
                                            <input type="text" className="form-control add-task col" placeholder="Search Task..." id="add-task" onInput={this.handleSearch} />
                                            <button className='btn col-1 border border-0 text-primary' type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
                                                    <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                                </svg>
                                            </button>
                                            <InsertModal insert={Insert} handleTask={this.handleTask} handleDescription={this.handleDescription}/>
                                        </form>
                                        <ul className="nav nav-pills todo-nav">
                                            <li role="presentation" className="nav-item all-task active"><a href="#" className="nav-link" onClick={this.handleAll}>All</a></li>
                                            <li role="presentation" className="nav-item active-task"><a href="#" className="nav-link" onClick={this.handleActive}>Active</a></li>
                                            <li role="presentation" className="nav-item completed-task"><a href="#" className="nav-link" onClick={this.handleComplted}>Completed</a></li>
                                        </ul>
                                        <div className="todo-list">
                                            {
                                                data.map(el => (
                                                    <ToDo key={el.id} props={el} />
                                                ))
                                            }
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
