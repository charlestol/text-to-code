const textInput = document.getElementById('input');
const result = document.getElementById('result');
const copyButton = document.getElementById('copyBtn');

const convertToArray = (text) => text.split(',');

textInput.addEventListener('input', e => {
    let userInput = e.target.value;
    console.log(convertToArray(userInput));
    result.textContent = JSON.stringify(convertToArray(userInput));
})

function copyResult() {
    var range = document.createRange();
    range.selectNode(result);
    console.log(range)
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied!";
}

function outFunc() {
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

  copyButton.addEventListener('click', copyResult);
  copyButton.addEventListener('mouseout', outFunc)
