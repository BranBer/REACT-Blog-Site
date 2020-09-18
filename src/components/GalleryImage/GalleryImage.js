import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import { generatePath } from 'react-router-dom';
import {GeneralContext} from '../GeneralContext';

const Gallery = styled.div`    
    display: flex;
    flex-direction: row;

    img
    {
        height: 25em;

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
    let myContext = useContext(GeneralContext);

    let srcUrl = myContext.value.url + '/media/';
    
    const [postImages, updatePostImages] = useState(
        {
        images: props.images,
        current: props.images[0],
        imagePos: 0
        });

    const [inprop, setInProp] = useState(false);

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
                <>   
                    {props.images.length >1?
                    <div onClick = {() => previousImage()} 
                        id = "previous">
                        <span>⮜</span>
                    </div>: null}  
                </>             
            {
                props.images.length >1?
                <img src = {srcUrl + postImages.current}/>:
                <img src = {srcUrl + postImages.current} style = {{border: '2px solid black', borderRadius: '50px'}}/>
            }
            
            <>
                {props.images.length >1?
                <div onClick = {() => nextImage()} 
                    id = "next">
                    <span>⮞</span>
                </div>: null}
            </>
                
    </Gallery>);
}

export default GalleryImage;