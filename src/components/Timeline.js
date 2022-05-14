import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import usePhotos from "../hooks/usePhotos";
import Post from './post/Post'


export default function Timeline() {
    const {photos} = usePhotos();
    console.log('usephotos ', photos)
    return (
        <div className='container col-span-2'>
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} width={600} height={400}/>
                    ))}

                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content}/>)):(<p>no photos</p>)

            }
        </div>
    );
}
