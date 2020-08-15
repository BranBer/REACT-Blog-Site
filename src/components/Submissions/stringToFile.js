/*
credit to 
https://github.com/codingforentrepreneurs/Try-Reactjs/blob/master/src/learn/ResuableUtils.js
*/

export const base64Stringtofile = (base64String, filename) =>
{    
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    
    while (n--) 
    {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, {type: mime})
}

export default base64Stringtofile;