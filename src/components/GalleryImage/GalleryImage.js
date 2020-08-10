import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Gallery = styled.div`
    
    height: auto;
    width: auto;
    margin:auto;

    background-color: #DAD3FF;
    display: inline-block;
    border-radius: 30px 30px 30px 30px;

    img
    {
        float: left;
        height: 350px;
        width: 350px;

        margin: auto;
    }


    div
    {
        float:left;
        height: 350px;
        width: 20px;
        color: white;
        background-color: #4D457A;
        border: 2px solid #4D457A;

        
        font-size: 20px;

    }

    div:hover
    {
        background-color: white;
        border: 2px solid white;
        color: black;
        cursor: pointer;
    }

    div:active
    {
        cursor: pointer;
        font-size: 25px;
    }

    span
    {
        position: relative;
        top: 40%;
    }
    

    #previous
    {
        border-radius: 30px 0 0 30px;
    }

    #next
    {
        border-radius: 0px 30px 30px 0px;
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