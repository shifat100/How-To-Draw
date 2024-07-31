document.body.style.overflow = 'hidden';

var animals = ['cow', 'horse', 'tiger', 'lion', 'snake', 'goat', 'elephant', 'camel', 'deer', 'fish', 'fox', 'frog', 'panda', 'sheep', 'squirrel'];
var numberofimage = [8, 8, 7, 7, 8, 8, 7, 9, 7, 4, 9, 5, 9, 8, 8];


function main() {
    document.body.style.overflow = 'hidden';
    var header = '<div class="header"><center>How To Draw</center></div><div class="content">';
    var body = '';
    for (var i = 0; i < animals.length; i++) {
        body += '<a id="' + animals[i] + '" class="list focusable" tabindex="' + i + '" title="' + numberofimage[i] + '"><img src="images/' + animals[i] + '/thumb.jpg" class="icon"/>' + animals[i] + '</a>';
    }
    var footer = '</div><div class="footer" style="position: fixed; bottom: 0px; left: 0px"><div class="footerelement"></div><div class="footerelement"></div><div class="footerelement">Exit</div>';
    document.body.innerHTML = header + body + footer;

    if (localStorage.getItem('listfocused') != null) { document.querySelectorAll('.focusable')[localStorage.getItem('listfocused')].focus(); } else { document.querySelectorAll('.focusable')[0].focus(); }

    $('.list').click(function () { showSlider(this.id, this.title); });


    document.body.removeEventListener('keydown', keydownslider);
    document.body.addEventListener('keydown', keydownmain);
    $('.footerelement:nth-child(3)').click(function () { window.close(); });
}







function showSlider(name, count) {
    document.body.style.overflow = 'hidden';
    var numberofimage = count;
    document.body.innerHTML = '';
    for (var i = 1; i <= numberofimage; i++) {
        document.body.innerHTML += '<div class="blur anim">\
    <div class="header"><span style="padding-left: 15px; ">'+ name + '</span></div>\
    <img class="thumb" src="images/'+ name + '/thumb.jpg"/>\
    \
    <table>\
        <tr>\
            <td width="15%">\
                <center><img class="slide-icon" id="prev" src="icons/slide-left-icon.png"/></center>\
            </td>\
            <td width="70%">\
                <center><img class="photo" src="images/'+ name + '/' + i + '.jpg"/></center>\
            </td>\
            <td width="15%">\
                <center><img class="slide-icon" id="next" src="icons/slide-right-icon.png"/></center>\
            </td>\
        </tr>\
    </table></center>\
    <div class="title">Step-'+ i + '</div>\
    <div class="footer"><div class="footerelement"></div><div class="footerelement"></div><div class="footerelement">Back</div></div>\
    </div>';
    }
    machine();
}


function machine() {
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
        $('.photo').removeClass('slideright');
        $('.photo').addClass('slideleft');
    }

    function minusSlides(n) {
        showSlides(slideIndex -= n);
        $('.photo').removeClass('slideleft');
        $('.photo').addClass('slideright');
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        document.body.style.overflow = 'hidden';
        var i;
        var slides = document.getElementsByClassName('blur');
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length };
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slides[slideIndex - 1].style.display = 'block';
    }
    function keydownslider(e) {
        if (e.key == 6 || e.key == 'ArrowRight' || e.key == 'Right') { plusSlides(1); }
        if (e.key == 4 || e.key == 'ArrowLeft' || e.key == 'Left') { minusSlides(1); }
        if (e.key == 'F2' || e.key == 'SoftRight') { main(); }
    }



    document.body.removeEventListener('keydown', keydownmain);
    document.body.addEventListener('keydown', keydownslider);
    $('#prev').click(function () { minusSlides(1); });
    $('#next').click(function () { plusSlides(1); });
    $('.footerelement:nth-child(3)').click(function () { main(); });
}


function keydownslider(e) {
    if (e.key == 6 || e.key == 'ArrowRight' || e.key == 'Right') { plusSlides(1); }
    if (e.key == 4 || e.key == 'ArrowLeft' || e.key == 'Left') { minusSlides(1); }
    if (e.key == 'F2' || e.key == 'SoftRight') { main(); }
}
function keydownmain(e) {
    switch (e.key) {
        case 'ArrowDown': focus(1);
            break;
        case 'Down': focus(1);
            break;
        case '8': focus(1);
            break;
        case 'ArrowUp': focus(-1);
            break;
        case 'Up': focus(-1);
            break;
        case '2': focus(-1);
            break;
        case 'Enter': showSlider(document.activeElement.id, document.activeElement.title); 
        getKaiAd({
            publisher: '080b82ab-b33a-4763-a498-50f464567e49',
            app: 'HowToDraw',
            slot: 'HowToDraw',
            onerror: err => console.error('Custom catch:', err),
            onready: ad => {
                ad.call('display');
            }
        });
            break;
        case 'F2': window.close();
            break;
        case 'SoftRight': window.close();
            break;
    }
    function focus(move) {
        const currentIndex = document.activeElement.tabIndex;
        const next = currentIndex + move;
        const items = document.querySelectorAll('.focusable');
        const targetElement = items[next];
        targetElement.focus();
        localStorage.setItem('listfocused', next);
    }

}


window.onload = main();