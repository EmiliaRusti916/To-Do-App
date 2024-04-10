const getAllController = require('../controllers/getAll.js');
const getByIdController=require('../controllers/getById.js');
const { todoList } = require('../model/todos.js');
describe('getFunctions function', () => {
    it('should return all tasks with status code 200', () => {
        
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn()
        };
        
        getAllController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.any(Array));
    });

    it('should return the task with status code 200 if task exists', () => {
        const todoId = "2";
        
        const req = {
            params: {
                id: todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        getByIdController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return a 404 status when task is not found', () => {
        const todoId = "0";
        
        const req = {
            params: {
                id: todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        getByIdController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
    });
});