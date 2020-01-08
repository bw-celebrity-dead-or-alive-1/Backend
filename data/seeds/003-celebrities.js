
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('celebrities').del()
    .then(function () {
      // Inserts seed entries
      return knex("celebrities").insert([
        { id: 1, firstName: "Michael", lastName: "Jackson", yearOfBirth: 1958, alive: false, death: 2009, image_url:"https://www.billboard.com/files/media/michael-jackson-1996-red-u-billboard-1548.jpg", fact: "King of Pop" },
        { id: 2, firstName: "David", lastName: "Carradine", yearOfBirth: 1936, alive: false, death: 2009, image_url:"https://cdn.britannica.com/79/137279-050-9B4DCEE3/David-Carradine-2004.jpg", fact: "Famous Martial Artist" },
        { id: 3, firstName: "Queen", lastName: "Elizabeth", yearOfBirth: 1900, alive: false, death: 2002, image_url:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/queen-elizabeth-ii-is-seen-at-the-chichester-theatre-while-news-photo-1573669417.jpg ", fact: "Famous Queen" },
        { id: 4, firstName: "Betty", lastName: "White", yearOfBirth: 1922, alive: true, death: 0000, image_url:"https://cdn.britannica.com/73/163273-050-CB204B32/Betty-White.jpg ", fact: "Famous Actress" },
        { id: 5, firstName: "Michael", lastName: "Jordan", yearOfBirth: 1963, alive: true, death: 0000, image_url:"https://blog-blogmediainc.netdna-ssl.com/upload/SportsBlogcom/2159727/0413747001456770288_filepicker.png", fact: "King of Pop" },
        ]);
    });
};
