import { Response, Request } from 'express'
import { ITodo } from './../../types/todo'
import Todo from '../../models/todo'
import User from '../../models/user'
import { IUser } from '../../types/user'

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, 'name' | 'description' | 'status' | 'priority'>
        const user: IUser[] = await User.find().sort({ updatedAt: 1 })
        const userSelected = user[0]
        console.log('userSelected', userSelected)
        await User.updateOne({
            _id: userSelected._id
        }, { updatedAt: new Date() })
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            priority: body.priority,
            status: body.status,
            assignedTo: userSelected.username
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
    } catch (error) {
        res.status(500).json({ message: 'server error' })
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
