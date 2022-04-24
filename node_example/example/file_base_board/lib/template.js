module.exports = {
    HTML: (title, list, body, control) => {
        return `
        <!doctype html>
        <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                ${control}
                ${body}
            </body>
        </html>
        `;
    },
    list: (filelist) => {
        const returnLi = filelist.reduce((accVal, curVal) => {
          accVal += `<li><a href="/topic/${curVal}">${curVal}</a></li>`;
          return accVal;
        }, '');
        
        return `<ul>${returnLi}</ul>`;
    }
}
