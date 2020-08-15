const textArea = document.querySelector('textarea');
const result = document.getElementById('result');
const copyButton = document.getElementById('copyBtn');
const tooltip = document.getElementById('myTooltip');
const fileButton = document.querySelector('input');
const separators = document.querySelectorAll('input[type=checkbox]');

const convertToArray = text => {
    let regex = "";
    separators.forEach(separator => {
        if(separator.checked) {
            if(regex.length)
                regex += '|'
            regex += separator.value;
        }
    });
    return text.split(new RegExp(regex));
}


const renderResult = text => result.textContent =  text.length ? JSON.stringify(convertToArray(text)) : '[]';

textArea.addEventListener('input', e => {
    renderResult(e.target.value);
});

separators.forEach(separator => {
    separator.addEventListener('change', () => {
        textArea.value.length && renderResult(textArea.value);
    })
});

fileButton.addEventListener('change', () => {
    let files = fileButton.files;
    if(files.length === 0) return;

    const file = files[0]

    let reader = new FileReader();

    reader.onload = e => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        textArea.value = lines.join('\n');
        let text = textArea.value;
        renderResult(text);
    };

    reader.onerror = e => alert(e.target.error.name);

    reader.readAsText(file);
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