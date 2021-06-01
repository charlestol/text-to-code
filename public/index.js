const textArea = document.querySelector('textarea');
const result = document.getElementById('result');
const copyButton = document.getElementById('copyBtn');
const tooltip = document.getElementById('myTooltip');
const separaters = document.querySelectorAll('.separaters input[type=checkbox]');
const removers = document.querySelectorAll('.removers input[type=checkbox]');
const checkboxes = document.querySelectorAll('input[type=checkbox]');

const convertToArray = text => {
    let regex = "";
    let res = [];
    separaters.forEach(separater => {
        if(separater.checked) {
            if(regex.length)
                regex += '|'
            regex += separater.value;
        }
    });

    res = text.split(new RegExp(regex));

    removers.forEach(remover => {
        if(remover.checked) {
            if(remover.value === "empty") {
                res = res.filter(item => item.length > 0);
            }
        }
    });

    return res;
}


const renderResult = text => result.textContent =  text.length ? JSON.stringify(convertToArray(text)) : '[]';

textArea.addEventListener('input', e => {
    renderResult(e.target.value);
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        textArea.value.length && renderResult(textArea.value);
    })
});

const copyResult = () => {
    var range = document.createRange();
    range.selectNode(result);
    console.log(range)
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    tooltip.innerHTML = "Copied!";
};

const outFunc = () => tooltip.innerHTML = "Copy to clipboard";

  copyButton.addEventListener('click', copyResult);
  copyButton.addEventListener('mouseout', outFunc)