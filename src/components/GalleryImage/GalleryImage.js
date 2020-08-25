import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Gallery = styled.div`    
    display: flex;
    flex-direction: row;

    img
    {
        height: 75%;

        border-top: 3px solid black;
        border-bottom: 3px solid black;
    }

    div
    {
        width: 20px;
        color: white;        
        overflow:hidden;
        font-size: 20px;
        transition: background-color 2s ease;
        z-index: 0;
    }

    div:hover
    {
        overflow:visible;
        background-color: white;
        cursor: pointer;
        background-color: rgba(77, 69, 122, .6)
    }

    div:active
    {
        cursor: pointer;
    }

    span
    {
        position: relative;
        top: 40%;
    }
    
    #previous
    {
        background-image: linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0));
        border-radius: 50px 0 0 50px;
    }

    #next
    {
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0));
        border-radius: 0 50px 50px 0;
    }

    #next:hover
    {
        
    }

    #previous:hover
    {
        //padding: 0 0 0 5px;
    }

`;

const GalleryImage = (props) =>
{
    const [postImages, updatePostImages] = useState(
        {
        images: props.images,
        current: props.images[0],
        imagePos: 0
        });

    const nextImage = () =>
    {
        let currentPos = postImages.imagePos;
        

        if(currentPos < postImages.images.length && postImages.images[currentPos + 1] !== undefined)
        {
            currentPos += 1;
            let nextImage = postImages.images[currentPos];
            console.log(nextImage);

            updatePostImages(
                {
                    images: props.images,
                    current: nextImage,
                    imagePos: currentPos
                }
            );
        }
    }

    const previousImage = () =>
    {
        let currentPos = postImages.imagePos;

        if(currentPos > 0 && postImages.images[currentPos - 1] !== undefined)
        {
            currentPos -= 1;
            let nextImage = postImages.images[currentPos];
            console.log(nextImage);

            updatePostImages(
                {
                    images: props.images,
                    current: nextImage,
                    imagePos: currentPos
                }
            );
        }
    }

    return (
    <Gallery>
            <div onClick = {() => previousImage()} 
                 id = "previous">
                <span>⮜</span>
            </div>   

            <img src = {'http://ec2-18-221-47-165.us-east-2.compute.amazonaws.com/media/' + postImages.current}/>
            
            
            <div onClick = {() => nextImage()} 
                 id = "next">
                <span>⮞</span>
            </div>
                
    </Gallery>);
}

export default GalleryImage;