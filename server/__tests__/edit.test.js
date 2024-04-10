const editTodoController = require('../controllers/editTodo.js');

describe('edit function', () => {
    it('should edit the task', () => {
        const updatedName = '1';
        const todoId = "1";
        
        const req = {
            params: { id: todoId },
            body: { task: updatedName }
        };
        const res = {
            json: jest.fn()
        };

        editTodoController(req, res);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ task: updatedName }));
    });

    it('should return a 404 status when task does not exist', () => {
        const todoList = [
            { id: "1", taskName: 'Task 1' },
            { id: "2", taskName: 'Task 2' }
        ];
        const updatedName = 'Updated Task 1';
        const todoId = "0"; 
        
        const req = {
            params: { id: todoId },
            body: { task: updatedName }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        editTodoController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
    });
});