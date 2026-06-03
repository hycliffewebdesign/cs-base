// TODO: Replace every placeholder below before launching the site.

module.exports = {
    name: "YOUR_BUSINESS_NAME",
    email: "YOUR_EMAIL@example.com",
    phoneForTel: "5555555555",
    phoneFormatted: "(555) 555-5555",
    address: {
        lineOne: "YOUR_STREET_ADDRESS",
        lineTwo: "SUITE_OR_UNIT_OPTIONAL",
        city: "YOUR_CITY",
        state: "ST",
        zip: "00000",
        country: "US",
        mapLink: "https://maps.google.com/",
    },
    socials: {
        facebook: "https://www.facebook.com/YOUR_PAGE",
        instagram: "https://www.instagram.com/YOUR_HANDLE",
    },
    //! Include https:// and no trailing slash
    domain: "https://www.example.com",
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
