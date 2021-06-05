const textArea = document.querySelector('textarea');
const result = document.getElementById('result');
const copyButton = document.getElementById('copyBtn');
const tooltip = document.getElementById('myTooltip');
const separators = document.querySelectorAll('.separators input[type=checkbox]');
const removers = document.querySelectorAll('.removers input[type=checkbox]');
const checkboxes = document.querySelectorAll('input[type=checkbox]');

const customSeparator = document.getElementById('customSeparator');
const customSeparatorInput = document.getElementById('customSeparatorInput');
const customRemover = document.getElementById('customRemover');
const customRemoverInput = document.getElementById('customRemoverInput');

const convertToArray = text => {
    let regex = "";
    let res = [];
    separators.forEach(separater => {
        if(separater.checked) {
            if(regex.length) {
                regex += '|';
            }
            regex += separater.value;
        }
    });

    res = text.split(new RegExp(regex)).filter(item => item.length);

    removers.forEach(remover => {
        if(remover.checked) {
            if(remover.value === "empty") {
                res = res.filter(item => item.length > 0);
            } else {
                res = res.filter(item => item !== remover.value);
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
    });
});

customSeparatorInput.addEventListener('input', e => {
    const { value } = e.target;
    customSeparator.value = value;

    if(customSeparator.checked) {
        if(value.length) {
            textArea.value.length && renderResult(textArea.value);
        } else {
            customSeparator.click();
        }
    }

    customSeparator.disabled = value.length ? false : true;
});

customRemoverInput.addEventListener('input', e => {
    const { value } = e.target;
    customRemover.value = value;

    if(customRemover.checked) {
        if(value.length) {
            textArea.value.length && renderResult(textArea.value);
        } else {
            customRemover.click();
        }
    }

    customRemover.disabled = value.length ? false : true;
});

const copyResult = () => {
    var range = document.createRange();
    range.selectNode(result);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    tooltip.innerHTML = "Copied!";
};

const outFunc = () => tooltip.innerHTML = "Copy to clipboard";

copyButton.addEventListener('click', copyResult);
copyButton.addEventListener('mouseout', outFunc);