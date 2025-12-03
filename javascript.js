
async function handleClick() {
  fetch("https://stoic-quotes.com/api/quote")
    .then((response) => response.json())
    .then(async (QuoteData) => {
      const Quote = QuoteData.text;
      const Author = QuoteData.author;

      // Update image and display quote
      updateImage(Author);
      setTimeout(updateDisplay(Quote, Author), 85000);

      // Generate and download poster
      const posterBlob = await generatePoster();
      downloadBlob(posterBlob, "poster.png");
    })
    .catch((error) => console.error("Error fetching quote:", error));
}

function updateImage(author) {
  let imagePath = "";

  if (author === "Marcus Aurelius") {
    imagePath = "Marcus Aurelius.png";
  } else if (author === "Seneca") {
    imagePath = "Seneca.png";
  } else if (author === "Epictetus") {
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

function updateDisplay(Quote, Author) {
  document.getElementById("text").innerHTML = Quote;
  document.getElementById("author").innerHTML = Author;
}

// ✅ Generate Poster using Canvas
async function generatePoster() {
  const design = document.getElementById("design");
  return html2canvas(design).then((canvas) => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  });
}

// ✅ Download blob as a file
function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

