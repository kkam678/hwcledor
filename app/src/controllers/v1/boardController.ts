import {Request, Response, NextFunction} from 'express';
import DefaultController from "../defaultController";
import BoardDao from "../../dao/boardDao";
import Board from "../../models/boardModel";
import BoardContent from "../../models/boardContentModel";

export default class BoardController extends DefaultController {

    constructor() {
        super({});
    }

    async index(req: Request, res: Response, next: NextFunction) {
        if (req.query.board_id === undefined) {
            res.send({'message': 'board_id is required'});
            res.destroy();
            return false;
        }
        const page = parseInt(<string>req.query.page);
        const limit = parseInt(<string>req.query.limit);
        const dao = new BoardDao();
        const totalCount = await dao.getListCount(req.query.board_id);
        const data = await dao.getList(req.query.board_id, page, limit);
        res.send(
            {
                'data': data,
                'meta': {
                    'page': page,
                    'last_page': totalCount.count / limit,
                    'limit': limit,
                    'total_count': totalCount.count
                }
            }
        );
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const dao = new BoardDao();
        const result = await dao.getDetail(req.params.id);
        res.send({'data': result});
    }

    async store(req: Request, res: Response, next: NextFunction) {

        const boardContent = new BoardContent();
        boardContent.boardId = req.body.board_id;
        boardContent.userName = req.body.user_name;
        boardContent.password = req.body.password;
        boardContent.title = req.body.title;
        boardContent.content = req.body.content;
        boardContent.ip = req.ip;

        const dao = new BoardDao();
        const board = new Board();
        const result = await dao.insertBoardContent(boardContent);
        if (result) {
            res.send({'data': boardContent});
        } else {
            res.send({'message': 'insert failed'});
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {

        const boardContent = new BoardContent();
        boardContent.id = parseInt(req.params.id);
        boardContent.password = req.body.password;
        boardContent.title = req.body.title;
        boardContent.content = req.body.content;
        boardContent.ip = req.ip;

        const dao = new BoardDao();
        const check = await dao.getDetail(boardContent.id);
        if (boardContent.password !== check.password) {
            res.status(400).send({'message': 'unmatched password.'});
            return false;
        }
        const result = await dao.updateBoardContent(boardContent);
        if (result) {
            res.send({'data': boardContent});
        } else {
            res.status(400).send({'message': 'update failed'});
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction) {

        const boardContent = new BoardContent();
        boardContent.id = parseInt(req.params.id);
        boardContent.password = req.body.password;
        boardContent.title = req.body.title;
        boardContent.content = req.body.content;
        boardContent.ip = req.ip;

        const dao = new BoardDao();
        const check = await dao.getDetail(boardContent.id);
        if (boardContent.password !== check.password) {
            res.status(400).send({'message': 'unmatched password.'});
            return false;
        }
        const result = await dao.deleteBoardContent(boardContent);
        if (result) {
            res.status(204).send();
        } else {
            res.status(400).send({'message': 'update failed'});
        }
    }
}
