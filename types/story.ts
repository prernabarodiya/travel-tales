export default interface Story {
    location: string,
    details: string,
    authorId: {
        profileName: string,
        email: string
    },

    images: string[]
}