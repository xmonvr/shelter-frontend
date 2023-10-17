export const BASE_URL = "http://localhost:8081";

export const ENDPOINTS = {    //obiekt
    about: "/tab/get-about-entry",    //wlasciwosci obiektu/pola
    animal: "/animal/animal-by-id",
    animalImage: "/images/get-image-by-animalId",
    filteredAnimals: "/animal/filtered-animals",
    editAbout: "tab/add-about-entry",
    donate: "/order/create-order",
    login: "/user/login",
    registration: "/registration",
    volutary: "/tab/get-volunteering-entry",
    editVoluntery: "tab/add-volunteering-entry",
    createAnimal: "/animal/add-animal",
    deleteAnimal: "/animal/delete-animal",
    editAnimal: "/animal/edit-animal",
    contact: "/tab/get-contact-entry",
    editContact: "/tab/add-contact-entry",
    sendAdoptionForm: "/adoptions/send-adoption-form",
    adoptionFormPdf: "/adoptions/adoption-form-pdf",
    createOrder: "/order/create-order"
};
// ENDPOINTS.about - referancja ado pola ktore trzyma dana wartosc
