const deleteController = require('../controllers/delete.js');

describe('delete function', () => {
    it('should delete the todo', () => {
        const todoId="1";
        const req = {
            params: {
                id:todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn() 
        };
        deleteController(req, res);
    });

    it('should return a 400 status when todo does not exists', () => {
        const todoId="0";
        const req = {
            params: {
                id: todoId
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn() 
        };

        deleteController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: "Todo not found" });
    });
});