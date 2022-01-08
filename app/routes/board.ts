import {Router} from 'express';
import BoardController from "../src/controllers/v1/boardController";

class BoardRoutes {
    router = Router();
    controller = new BoardController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route('/').get(this.controller.index);
        this.router.route('/:board_id/:id').get(this.controller.show);
        this.router.route('/').post(this.controller.store);
        this.router.route('/:id').put(this.controller.update);
        this.router.route('/:id').delete(this.controller.destroy);
    }
}

export default new BoardRoutes().router;