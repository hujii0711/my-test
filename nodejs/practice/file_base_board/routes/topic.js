const express = require('express');
const router = express.Router();
const path = require('path'); //폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
const fs = require('fs'); //파일 시스템에 접근하는 모듈
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');

//#. 글쓰기 페이지(router의 선언 순서 중요: 글상세를 앞으로 빼니 404 에러 발생!)
router.get('/create', (request, response) => {

    const title = 'WEB - create';
    const list = template.list(request.list);
    const html = template.HTML(title, list, `
        <form action="/topic/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `, '');
    response.send(html);
});

//#. 글쓰기 프로세스
router.post('/create_process', (request, response) => {
    const post = request.body; // <form> 태그의 name속성의 값을 기준으로 값이 셋
    const title = post.title;
    const description = post.description;
    // 파일 생성
    fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
        response.redirect(`/topic/${title}`);
    });
});

//#. 글 수정 페이지
router.get('/update/:pageId', (request, response) => {
    const filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
        const title = request.params.pageId;
        const list = template.list(request.list);
        const html = template.HTML(title, list,
            `
            <form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description"
                        placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `,
            `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
        );
        response.send(html);
    });
});

//#. 글 수정 프로세스
router.post('/update_process', (request, response) => {
    const post = request.body; //// <form> 태그의 name속성의 값을 기준으로 값이 셋
    const id = post.id;
    const title = post.title;
    const description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, (error) => {
        fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
            response.redirect(`/topic/${title}`);
            response.end();
        });
    });
});

//#. 글 삭제 프로세스
router.post('/delete_process', (request, response) => {
    const post = request.body;
    const id = post.id;
    const filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, (error) => {
        response.redirect('/');
    });
});

//#. 글 상세보기
router.get('/:pageId', (request, response, next) => {
  
    const filteredId = path.parse(request.params.pageId).base;

    // 해당 파일에 접근
    fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
        if(err) {
            next(err);
        } else {
            const title = request.params.pageId;
            const sanitizedTitle = sanitizeHtml(title);
            const sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
            });
            const list = template.list(request.list);
            const html = template.HTML(sanitizedTitle, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                ` <a href="/topic/create">create</a>
                    <a href="/topic/update/${sanitizedTitle}">update</a>
                    <form action="/topic/delete_process" method="post">
                        <input type="hidden" name="id" value="${sanitizedTitle}">
                        <input type="submit" value="delete">
                    </form>`
            );
            response.send(html);
        }
    });
});

module.exports = router;
