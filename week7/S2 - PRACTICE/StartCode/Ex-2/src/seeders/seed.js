import { Author } from '../models/index.js';

const seedData = async () => {
    const ronan = await Author.create({
        name: "Ronan The Best",
        birthYear: 1990
    });

    const kim = await Author.create({
        name: "Kim Ang",
        birthYear: 1995
    });

    const hok = await Author.create({
        name: "Hok Tim",
        birthYear: 2015
    });

    await ronan.createBook({
        title: "Mastering Life",
        publicationYear: 2015,
        pages: 280
    });

    await kim.createBook({
        title: "AI World",
        publicationYear: 2022,
        pages: 250
    });

    await hok.createBook({
        title: "Young Genius",
        publicationYear: 2024,
        pages: 180
    });

};

export default seedData;