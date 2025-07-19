import Story from "@/types/story";
import Image from "next/image";
export default function FullTales(story:Story){

    return(
        <div className="bg-gray-200 m-4">
            <label className="text-blue-800">{story.location}</label>
            <Image 
            alt={story.location}
            src={`${story.images[0]}`}></Image>
            <div>
                {story.details}
            </div>
            <label>{story.authorId.profileName|| story.authorId.email}</label>

        </div>
    )
}