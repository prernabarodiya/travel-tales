export default interface Story {
    _id:string,
    location: string,
    details: string,
    authorId: {
        profileName: string,
        email: string
    },
duration:Date,
    images: string[]
}