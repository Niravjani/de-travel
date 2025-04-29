import tourImg01 from "../images/tour-img01.jpeg";
import tourImg02 from "../images/tour-img02.jpeg";
import tourImg03 from "../images/tour-img03.jpeg";
import tourImg04 from "../images/tour-img04.jpeg";
import tourImg05 from "../images/tour-img05.jpeg";
import tourImg06 from "../images/tour-img06.jpeg";
import tourImg07 from "../images/tour-img07.jpeg";


const tours = [
  {
    id: "01",
    title: "Taj Mahal",
    city: "Agra",
    distance: 300,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 10,
    desc: "The iconic white marble mausoleum and symbol of love.",
    reviews: [
      {
        name: "Raj Gohil ",
        rating: 4.3,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "02",
    title: "Jaipur City Palace",
    city: "Rajasthan",
    distance: 400,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 8,
    desc: "A blend of Rajasthani and Mughal architecture in the Pink City.",
    reviews: [
      {
        name: "Ramesh Solanki",
        rating: 4.4,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: "03",
    title: "Backwaters",
    city: "Kerala",
    distance: 500,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 8,
    desc: "A serene network of lagoons, rivers, and lakes best explored by houseboat.",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: true,
  },
  {
    id: "04",
    title: "Varanasi Ghats",
    city: "Uttar Pradesh",
    distance: 500,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 8,
    desc: "Spiritual steps along the Ganges, known for rituals and vibrant culture.",
    reviews: [
      {
        name: "mit Patel",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: "05",
    title: "Meenakshi Temple",
    city: "Madurai",
    distance: 500,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 8,
    desc: "A colorful, intricately carved Dravidian-style Hindu temple.",
    reviews: [
      {
        name: "Maulik trivedi ",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: "06",
    title: "Golden Temple",
    city: " Amritsar ",
    distance: 500,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 8,
    desc: "A sacred Sikh shrine with a stunning gold-plated dome and serene lake.",
    reviews: [
      {
        name: "nirav rathod",
        rating: 4.6,
      },
      {
        name: "nirav rathod",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: "07",
    title: "Leh-Ladakh Mountains",
    city: "Leh-Ladakh ",
    distance: 500,
    price: 1099,
    maxGroupSize: 8,
    desc: "A Himalayan desert region famous for monasteries and dramatic landscapes.",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: "08",
    title: "Backwaters",
    city: "Kerala",
    distance: 500,
    adress:'Somwhere',
    price: 1099,
    maxGroupSize: 8,
    desc: "A serene network of lagoons, rivers, and lakes best explored by houseboat..",
    reviews: [],
    avgRating: 4.5,
    photo: tourImg03,
    featured: false,
  },
];

export default tours;
