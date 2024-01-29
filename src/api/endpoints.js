export const BASE_URL = "http://localhost:8081";

export const ENDPOINTS = {
    about: "/tab/get-about-entry",
    animal: "/animal/animal-by-id",
    animalImage: "/animal/get-image-by-animalId",
    filteredAnimals: "/animal/filtered-animals",
    editAbout: "tab/add-about-entry",
    login: "/user/login",
    logout: "/auth/logout",
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
