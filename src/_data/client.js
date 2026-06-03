const productionDomain = "https://hycliffewebdesign.com";

function siteDomain() {
    const fromEnv = process.env.URL || productionDomain;
    return fromEnv.replace(/\/$/, "");
}

module.exports = {
    name: "Hycliffe Web Design",
    email: "hycliffewebdesign@gmail.com",
    phoneForTel: "",
    phoneFormatted: "",
    tagline:
        "Professional websites for local businesses. Fast, mobile-optimized, and built to convert.",
    address: {
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
        mapLink: "",
    },
    socials: {
        facebook: "",
        instagram: "",
    },
    domain: siteDomain(),
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
