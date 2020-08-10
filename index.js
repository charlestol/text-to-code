const textInput = document.getElementById('input');
const result = document.getElementById('result');
const copyButton = document.getElementById('copyBtn');
const tooltip = document.getElementById('myTooltip');
const showEscCodesButton = document.getElementById('showEscCodesBtn');

const convertToArray = (text) => text.split(',');

textInput.addEventListener('input', e => {
    let userInput = e.target.value;
    result.textContent =  userInput.length ? JSON.stringify(convertToArray(userInput)) : '[]';
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
