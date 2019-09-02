$(document).ready(function () {
    // sidebar script
    const list = parseList();
    const sidebar = $('#content-sidebar');
    list.map(item => {
        sidebar.append(`<li><a href="${item.href}">${item.title}</a></li>`);
        if (item.child && item.child.length) {
            const ul = document.createElement('ul');
            item.child.map(e => ul.append(createListItem(e.href, e.title)));
            sidebar.append(ul);
        }
    });
    initProgress();
});

function parseList() {
    const list = [];
    const h1 = document.body.querySelectorAll("article > h1, article > h2");
    let node = null;
    let latestTag = null;
    for (let i = 0; i < h1.length; i++) {
        if (h1[i].tagName === 'H1') {
            node = createNote(h1[i].id, h1[i].textContent);
        } else {
            node.child.push(createNote(h1[i].id, h1[i].textContent));
        }
        if (h1[i].tagName === 'H1') {
            list.push(node);
        }
        latestTag = h1[i].tagName;
    }
    console.log(list);
    return list;
}

function createNote(href, title) {
    return {href: '#' + href, title, child: []};
}

function createListItem(href, title) {
    const childLi = document.createElement('li');
    const aTag = document.createElement('a');
    aTag.href = href;
    const text = document.createTextNode(title);
    aTag.append(text);
    childLi.append(aTag);
    return childLi;
}

function initProgress() {
    const progressBar = document.querySelector('#reading-progress');
    if (progressBar) {
        // Progress bar
        let lastScrollY = window.scrollY;
        let lastWindowHeight = window.innerHeight;
        let lastDocumentHeight = $(document).height();

        function onScroll() {
            lastScrollY = window.scrollY;
            update();
        }

        function onResize() {
            lastWindowHeight = window.innerHeight;
            lastDocumentHeight = $(document).height();
        }

        function update() {
            const progressMax = lastDocumentHeight - lastWindowHeight;
            progressBar.setAttribute('max', progressMax);
            progressBar.setAttribute('value', lastScrollY);
        }

        window.addEventListener('scroll', onScroll, {passive: true});
        window.addEventListener('scroll', onResize);

        update();
    }
}
