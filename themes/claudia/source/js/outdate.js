(function() {
    let times = document.getElementsByTagName('time');

    var currentDate = new Date();
    var postDate = new Date(times[0].dateTime);
    var timeDiff = currentDate.getTime() - postDate.getTime();
    var dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff >= 30) {
        var container = document.getElementsByTagName('article');
        var warning = document.createElement('div');
        warning.innerHTML = 'Caution: This blog post may contain outdated information as it has been published a long time ago.';
        warning.style.background = '#FFC107';
        warning.style.color = '#fff';
        warning.style.padding = '10px';
        warning.style.textAlign = 'center';
        warning.style.margin = '10px';
        warning.style.fontWeight = 'bolder';
        
        var firstChild = container[0].firstChild;
        container[0].insertBefore(warning, firstChild); 
    }

    let toc = document.getElementsByClassName('toc');
    var toctitle = document.createElement('div');
    toctitle.innerHTML = 'Table of Contents';
    toctitle.style.fontWeight = 'bolder';
    toctitle.style.fontSize = '1.2em';
    toctitle.style.margin = '10px';
    var firstChildtoc = toc[0].firstChild;
    toc[0].insertBefore(toctitle, firstChildtoc); 
})();
