var doc = document;

var initTextarea = doc.querySelector( "#init" );
var resultTextarea = doc.querySelector( "#result" );
var resultCssTextarea = doc.querySelector( "#result-css" );
var resultDemo = doc.querySelector( "#demo" );
var demoWrapper = doc.querySelector( ".demo-wrapper" );
var contrastButtons = doc.querySelectorAll( ".contrast-button" );
var contrastButtonCurrent = null;
var backgroundColor = 'transparent';

var expanders = doc.querySelectorAll( ".expander" );
var expandedClass = "expanded";
var demoContrastClass = "demo-contrast-on";
var symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

const quotesInputs = document.querySelectorAll('.options__input');
let externalQuotesValue = document.querySelector('.options__input:checked').value;
let quotes = getQuotes();

const buttonExample = document.querySelector('.button-example');


// Textarea Actions
//----------------------------------------

initTextarea.oninput = function() {
    resultTextarea.value = encodeSVG(initTextarea.value);
};

initTextarea.onkeyup = function() {
    getResults();
};

function fetchImage() {
    let url = document.querySelector("#url").value;
    fetch(url).then(r=>r.text()).then(img=>{
        console.dir(img);
        initTextarea.value = img;
        getResults();
        //resultTextarea.value = encodeSVG(img);
    });
}
function copyText(el) {
    el.select();
    el.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(el.value);
    
    let rect = el.getBoundingClientRect();

    let pop = document.createElement("div");
    pop.className = "notification";
    pop.innerHTML = "Copied";
    el.parentNode.insertBefore(pop, el);
    setTimeout(function() { pop.style.opacity = 1; pop.style.height = "2rem"; pop.style.top = "0"; }, 10);
    setTimeout(function() { pop.style.opacity = 0; pop.style.height = "0rem";  pop.style.top = "2rem"; setTimeout(function() { pop.parentElement.removeChild(pop); }, 4000); }, 3000);
}

function getResults() {
    if(!initTextarea.value) {
        return;
    }

    var namespaced = addNameSpace( initTextarea.value );
    var escaped = encodeSVG( namespaced );
    resultTextarea.value = escaped;
    var resultCss = `background-image: url(${quotes.level1}data:image/svg+xml,${escaped}${quotes.level1});`;
    resultCssTextarea.value = resultCss;
    resultDemo.setAttribute( "style", resultCss );
}


// Tabs Actions
//----------------------------------------

for (var i = 0; i < expanders.length; i++) {
    var expander = expanders[i];

    expander.onclick = function() {
        var parent = this.parentNode;
        var expanded = parent.querySelector( "." + expandedClass );
        expanded.classList.toggle( "hidden" );
        this.classList.toggle( "opened" );
    };
}


// Switch quotes
//----------------------------------------

quotesInputs.forEach(input => {
    input.addEventListener('input', function () {
        externalQuotesValue = this.value;
        quotes = getQuotes();
        getResults();
    });
});


// Set example
//----------------------------------------

buttonExample.addEventListener('click', () => {
    initTextarea.value = `<svg>
  <circle r="50" cx="50" cy="50" fill="tomato"/>
  <circle r="41" cx="47" cy="50" fill="orange"/>
  <circle r="33" cx="48" cy="53" fill="gold"/>
  <circle r="25" cx="49" cy="51" fill="yellowgreen"/>
  <circle r="17" cx="52" cy="50" fill="lightseagreen"/>
  <circle r="9" cx="55" cy="48" fill="teal"/>
</svg>`;
    getResults();
})


// Demo Background Switch
//----------------------------------------

function contrastButtonsSetCurrent(button) {
    const classCurrent = 'contrast-button--current';

    if (contrastButtonCurrent) {
        contrastButtonCurrent.classList.remove(classCurrent);
    }

    backgroundColor = button.dataset.color;
    contrastButtonCurrent = button;
    button.classList.add(classCurrent);
}

contrastButtons.forEach(button => {
    if (!backgroundColor) {
        contrastButtonsSetCurrent(button);
    }

    button.addEventListener('click', function () {
        contrastButtonsSetCurrent(this);
        demoWrapper.style.background = backgroundColor;
    });
});


// Namespace
//----------------------------------------

function addNameSpace( data ) {
    if ( data.indexOf( 'http://www.w3.org/2000/svg' ) < 0 ) {
        data = data.replace( /<svg/g, `<svg xmlns=${quotes.level2}http://www.w3.org/2000/svg${quotes.level2}` );
    }

    return data;
}


// Encoding
//----------------------------------------

function encodeSVG( data ) {
    // Use single quotes instead of double to avoid encoding.
    if ( externalQuotesValue === 'double') {
        data = data.replace( /"/g, '\'' );
    }
    else {
       data = data.replace( /'/g, '"' );
    }

    data = data.replace( />\s{1,}</g, "><" );
    data = data.replace( /\s{2,}/g, " " );

    return data.replace( symbols, encodeURIComponent );
}


// Get quotes for levels
//----------------------------------------

function getQuotes() {
    const double = `"`;
    const single = `'`;

    return {
        level1: externalQuotesValue === 'double' ? double : single,
        level2: externalQuotesValue === 'double' ? single : double
    };
}

// Common
//----------------------------------------

function out( data ) {
    console.log( data );
}
