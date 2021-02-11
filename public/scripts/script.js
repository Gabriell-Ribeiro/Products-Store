// Make Cards
const sectionCards = document.querySelector("section.cards");

const card = document.querySelector("div.card");

const items = [
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "Abcccc",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "Abc2dccc",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "afgefg",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "235h",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "kykt",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "kyt4543",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "lungfn",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "grdg4",
    value: "50,00"
  },
  {
    img:
      "https://images.pexels.com/photos/5644323/pexels-photo-5644323.jpeg?cs=srgb&dl=pexels-laura-stanley-5644323.jpg&fm=jpg",
    name: "tjehe",
    value: "50,00"
  },
];

items.map(item => {
  const cardClone = card.cloneNode(true);
  cardClone.querySelector("img").src = item.img;
  cardClone.querySelector(".title").innerHTML = item.name;
  cardClone.querySelector(".value").innerHTML = item.value
  sectionCards.appendChild(cardClone);
});

card.remove();