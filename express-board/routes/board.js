const express = require('express');
const router = express.Router();

let Board = require('../model/Board')

router.get('/',(req,res,next)=>{
    Board.find().then(board=>{
        res.json(board);
    }).catch(err=>{
        next(err);
    })
});

// GET : 게시글 목록 조회
router.get("/:boardid",(req,res,next)=>{
    var keys = Object.getOwnPropertyNames(req);
    // console.log(req)
    console.log(keys)
    Board.findById(req.params.boardid).then( board =>{
        res.json(board);
    }).catch(err=>{
        next(err);
    })
});

//POST : 게시글 작성
router.post("/",(req,res,next)=>{
    console.log(req.body);
    Board.create({
        title : req.body.title,
        content : req.body.content,
        author : "anony"
    }).then((data)=>{
        res.json(data)
    }).catch(err=>{
        next(err);
    })
});

// 게시글 내용 바꾸기 번호 없이
router.put("/",(req,res,next)=>{ 
    console.log("<before>\n"+ req.body);
    Board.updateMany(
        {title : req.body.title , content : req.body.content},
        {title : req.body.new_title, content : req.body.new_content}
    ).then(result=>{
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})

router.put("/:boardid",(req,res,next)=>{ 
    // console.log(Board.findById(req.params.id))
    
    Board.findById(req.params.boardid).then(document=>{
        if(!document){
            console.log("Cannot find document")
            return;
        }
        document.title = req.body.new_title;
        document.content = req.body.new_content;
        document.save();
        res.json(document)
    }).catch(err=>{
        next(err)
    })

    // Board.findById(req.params.boardid).then(docs=>{
    //     docs.setUpdate({
    //         title : req.body.new_title,
    //         content : req.body.new_content
    //     })
    //     docs.getUpdate();
    //     res.json(docs);
    // }).catch(err=>{
    //     console.log(err)
    // })
})


router.delete("/",(req, res, next)=>{
    console.log("<before>\n"+ req.body)
    Board.deleteMany(
        {title : req.body.title, 
        content : req.body.content}
    ).then(result=>{
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})

module.exports = router