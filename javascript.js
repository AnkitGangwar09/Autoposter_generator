function handleClick() {
  fetch('https://stoic-quotes.com/api/quote')
    .then(data => data.json())
    .then(QuoteData => {
      const Quote = QuoteData.text;
      const Author = QuoteData.author;
      handleNewJoke(Quote, Author);
    })

}

function updateImage(author) {
  let imagePath = "Marcus.png";

  if (author === "Marcus Aurelius") {
    imagePath = "Marcus.png";
  } else if (author === "Seneca") {
    imagePath = "Seneca.png";
  } else if (author === "Epictetus.png") {
    imagePath = "Epictetus.png";
  } else {
    console.log("Author not found!");
    return;
  }

  const authorImg = document.querySelector("#authorImage img");
  if (authorImg) {
    authorImg.src = imagePath;
  }
}

function handleNewJoke(Quote, Author) {
  let n = Quote.length;
  let i = 0, j = 0, count = 0;

  for (i = 0; i < n; i++) {
    if (Quote[i] == " " && count == 6) {
      Quote[i] = "\n";
    }
    if (Quote[i] == " ") {
      count = count + 1;
    }
  }

  updateImage(Author);
  const mytimeout1 = setTimeout(updateDisplay(Quote, Author), 50000);
  mytimeout1;

}


function updateDisplay(Quote, Author) {
  const outputElement = document.getElementById('text');
  const outputElement1 = document.getElementById('author');
  outputElement.innerHTML = Quote;
  outputElement1.innerHTML = Author;

  const mytimeout2 = setTimeout(generateAndDownloadPoster(), 200000);
  mytimeout2;
}

function generateAndDownloadPoster() {
  let a = 1;
  const design = document.getElementById('design');
  html2canvas(design).then(canvas => {
    const link = document.createElement('a');
    link.download = `poster${a}.png`; // Download each poster with a unique name
    link.href = canvas.toDataURL('image/png');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}       


// one time it will work perfectly.click on button ,, anh poster will be downloaded
