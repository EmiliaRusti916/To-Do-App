const addController = require('../controllers/add.js');

describe('add function', () => {
    it('should add a new todo', () => {
        const req = {
            body: {
                id: "3",
                task: 'New To Do',
                completed: false
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn() 
        };

        addController(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(expect.any(Object)); 
    });
});