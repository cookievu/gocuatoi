$(document).ready(function () {
    // sidebar script
    const h1 = document.body.querySelectorAll("article > h1");
    const sidebar = $('#content-sidebar');
    for (let i = 0; i < h1.length; i++) {
        sidebar.append(` <li><a href="#${h1[i].id}">${h1[i].textContent}</a></li>`)
    }

    initProgress();
});

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
