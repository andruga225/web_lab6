import React, {useEffect, useRef, useState} from 'react';
import QRCode from "react-qr-code";

const QrCode = (props) => {

    //const qrcodeCanvasRef = useRef(null);
    const [valid, setValid] = useState(true)

    const isValidUrl = urlString=> {
        try {
            return Boolean(new URL(urlString));
        }
        catch(e){
            setValid(false);
            return false;
        }
    }

    useEffect(() => {
        isValidUrl(props.author.biography)
    }, []);

    return (
        <div>
            {valid ?
                <QRCode value={props.author.biography} size={50}/> :
                <div>
                    {props.author.biography}
                </div>
            }
        </div>
    );
};

export default QrCode;